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

            upload_start();
//
        });


        var readBlob = function (i, $scope) {
            var blob;

            var start = $scope.threads[i]['fileLoaded'] + $scope.fileSize * i / 5;
            if ($scope.file.webkitSlice) {
                blob = $scope.file.webkitSlice(start, start + $scope.block + 1);
            } else if ($scope.file.mozSlice) {
                blob = $scope.file.mozSlice(start, start + $scope.block + 1);
            } else if ($scope.file.slice) {
                blob = $scope.file.slice(start, start + $scope.block + 1);
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
                    readBlob(i, $scope);
                }
            });
        };


        var upload_start = function () {

            $.ajax({

                url: '/upload/start',
                type: 'post',
                data: {filename: $scope.file.name},
                success: function (data) {

                    for (var i = 0; i < 5; i++) {
                        $scope.threads[i]['fileReader'] = new FileReader();
                        $scope.threads[i]['fileReader'].onload = readSuccess;
                        $scope.threads[i]['fileReader'].no = i;
                        Concurrent.Thread.create(readBlob, i, $scope);
                    }
                }
            });


        };


        var readSuccess = function (e) {

            var index = e.target.no;
            $scope.threads[index]['fileLoaded'] += e.total;


//            console.log($scope.threads[index]['fileLoaded']);
            $scope.threads[index]['percent'] = $scope.threads[index]['fileLoaded'] / $scope.threads[index]['fileSize'];
            if (e.target.readyState == FileReader.DONE) {
                if ($scope.threads[index]['percent'] < 1) {
                    upload_blob(e, index, $scope);
                }
            } else {
                alert('读取失败')
            }

        };

    }]);

$(function () {


//    $('#open_file').change(function () {
//
//
//        var block = 0.1 * 1024 * 1024; // 每次读取1M
//
//
//        // 当前文件对象
//        var file;
//// 当前已读取大小
//        var fileLoaded;
//// 文件总大小
//        var fileSize;
//
//
//        file = this.files[0];
//
//
//        fileSize = file.size;
//        fileLoaded = 0;
//
//        var fileReader = new FileReader();
//
//
//        var readBlob = function () {
//            var blob;
//            if (file.webkitSlice) {
//                blob = file.webkitSlice(fileLoaded, fileLoaded + block + 1);
//            } else if (file.mozSlice) {
//                blob = file.mozSlice(fileLoaded, fileLoaded + block + 1);
//            } else if (file.slice) {
//                blob = file.slice(fileLoaded, fileLoaded + block + 1);
//            } else {
//                alert('不支持分段读取！');
//                return false;
//            }
//            fileReader.readAsBinaryString(blob);
//        };
//
//
//        // 每个blob读取完毕时调用
//        var readSuccess = function (e) {
//            fileLoaded += e.total;
//            var percent = fileLoaded / fileSize;
//            console.log(fileLoaded);
//            if (e.target.readyState == FileReader.DONE) {
//                if (percent < 1) {
//                    upload_blob(e);
//                }
//            } else {
//                alert('读取失败')
//            }
//
//        };
//
//        fileReader.onload = readSuccess;
//
//
//        var upload_blob = function (e) {
//            $.ajax({
//
//                url: '/upload/upload',
//                type: 'post',
//                data: {
//                    data: e.target.result,
//                    start: fileLoaded
//                },
//                success: function (data) {
//                    readBlob();
//                }
//            });
//        };
//
//
//        var upload_start = function () {
//            $.ajax({
//
//                url: '/upload/start',
//                type: 'post',
//                data: {
//
//                },
//                success: function (data) {
//
//                    alert(data);
//                }
//            });
//
//
//        };
//
//        upload_start();
//
//    });


});