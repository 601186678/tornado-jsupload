/**
 * Created by root on 10/1/14.
 */


angular.module('upload', [])
    .controller('c_upload', ['$scope', function ($scope) {


        $scope.threads = [];
        for (var i = 0; i < 5; i++) {
            var thread = {};
            thread['percent'] = 0;

            $scope.threads.push(thread);
        }
        $scope.block = 16 * 1024;


        $('#select_file').click(function () {

            $('#open_file').trigger('click');

        });

        $('#open_file').change(function () {
            $scope.file = this.files[0];

            $scope.current_file = {
                name: $scope.file.name,
                size: ($scope.file.size / 1024 / 1024 + 'MB')
            };


            for (var index in  $scope.threads) {

                var thread = $scope.threads[index];
                thread['fileSize'] = $scope.file.size / 5;
                thread['fileLoaded'] = 0;
                thread['percent'] = 0;
                $scope.threads[index] = thread;
            }
            $scope.$apply();

        });


        $('#start_upload').click(function () {


            if (!$scope.file) {

                alert('请选择文件');
                return;
            }
            upload_start();
//
        });


        var readBlob = function (i, $scope) {
            var blob;


            var start = $scope.threads[i]['fileLoaded'] + $scope.threads[i]['fileSize'] * i;


            var range = $scope.block;

            if ($scope.threads[i]['fileLoaded'] + $scope.block > $scope.threads[i]['fileSize']) {

                range = $scope.threads[i]['fileSize'] - $scope.threads[i]['fileLoaded'] - 1;
            }

            if ($scope.file.webkitSlice) {
                blob = $scope.file.webkitSlice(start, start + range + 1);
            } else if ($scope.file.mozSlice) {
                blob = $scope.file.mozSlice(start, start + range + 1);
            } else if ($scope.file.slice) {
                blob = $scope.file.slice(start, start + range + 1);
            } else {
                alert('不支持分段读取！');
                return false;
            }
            $scope.threads[i]['fileReader'].readAsBinaryString(blob);
        };


        var upload_blob = function (e, i, $scope) {


            $.ajax({


                url: '/upload/blob',
                type: 'post',
                data: {
                    data: $.base64.encode(e.target.result),
                    no: i
                },
                success: function (data) {

                    if (data['state'] == 'success') {

                        readBlob(i, $scope);
                    }
                }, error: function () {
                    upload_blob(e, i, $scope);
                }
            });
        };


        var upload_start = function () {

            $.ajax({

                url: '/upload/start',
                type: 'post',
                dataType: 'json',
                data: {filename: $scope.file.name},
                success: function (data) {


                    if (data['state'] == 'success') {
                        for (var i = 0; i < 5; i++) {
                            $scope.threads[i]['fileReader'] = new FileReader();
                            $scope.threads[i]['fileReader'].onload = readSuccess;
                            $scope.threads[i]['fileReader'].no = i;
                            Concurrent.Thread.create(readBlob, i, $scope);
                        }
                    }
                },
                error: function () {
                    upload_start();
                }
            });


        };


        var blobUploadEnd = function (no) {

            $.ajax({
                url: '/upload/end',
                type: 'post',
                data: {no: no},
                success: function (data) {


                    console.log(data);

                    if (data['state'] == 'success' && data['data'] == 'all_success') {


                        alert('success');
                        $scope.threads = [];
                        for (var i = 0; i < 5; i++) {
                            var thread = {};
                            thread['percent'] = 0;

                            $scope.threads.push(thread);
                        }


                        $scope.file = undefined;

                        $scope.current_file = undefined;

                        $scope.$apply();

                    }
                }

            })
        };


        var readSuccess = function (e) {

            var index = e.target.no;

            if (e.target.readyState == FileReader.DONE) {
                if ($scope.threads[index]['percent'] < 100) {


                    $scope.threads[index]['fileLoaded'] += e.total;

                    $scope.threads[index]['percent'] = $scope.threads[index]['fileLoaded'] / $scope.threads[index]['fileSize'] * 100;

                    $scope.$apply();
                    upload_blob(e, index, $scope);
                } else {
                    blobUploadEnd(index);
                }
            } else {
                alert('读取失败')
            }

        };

    }]);
