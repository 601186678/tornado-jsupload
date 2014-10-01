/**
 * Created by root on 10/1/14.
 */


$(function () {


    $('#open_file').change(function () {


        var block = 0.1 * 1024 * 1024; // 每次读取1M


        // 当前文件对象
        var file;
// 当前已读取大小
        var fileLoaded;
// 文件总大小
        var fileSize;


        file = this.files[0];


        fileSize = file.size;
        fileLoaded = 0;

        var fileReader = new FileReader();


        var readBlob = function () {
            var blob;
            if (file.webkitSlice) {
                blob = file.webkitSlice(fileLoaded, fileLoaded + block + 1);
            } else if (file.mozSlice) {
                blob = file.mozSlice(fileLoaded, fileLoaded + block + 1);
            } else if (file.slice) {
                blob = file.slice(fileLoaded, fileLoaded + block + 1);
            } else {
                alert('不支持分段读取！');
                return false;
            }
            fileReader.readAsBinaryString(blob);
        };


        // 每个blob读取完毕时调用
        var readSuccess = function (e) {
            fileLoaded += e.total;
            var percent = fileLoaded / fileSize;
            console.log(fileLoaded);
            if (e.target.readyState == FileReader.DONE) {
                if (percent < 1) {
                    upload_blob(e);
                }
            } else {
                alert('读取失败')
            }

        };

        fileReader.onload = readSuccess;


        var upload_blob = function (e) {
            $.ajax({

                url: '/upload/upload',
                type: 'post',
                data: {
                    data: e.target.result,
                    start: fileLoaded
                },
                success: function (data) {
                    readBlob();
                }
            });
        };


        var upload_start = function () {
            $.ajax({

                url: '/upload/start',
                type: 'post',
                data: {

                },
                success: function (data) {
//                    readBlob();

                    alert(data);
                }
            });


        };

        upload_start();
//        readBlob();

    });


});