<?php

namespace App\Libraries;

use Help;

class Upload
{
    private function _fileInfo()
    {
        $i = 0;
        $files = [];

        foreach ($_FILES as $v) {
            if (is_string($v['name'])) {
                $files[$i] = $v;
                $i++;
            } else {
                foreach ($v['name'] as $key => $value) {
                    $files[$i]['name'] = $value;
                    $files[$i]['size'] = $v['size'][$key];
                    $files[$i]['tmp_name'] = $v['tmp_name'][$key];
                    $files[$i]['error'] = $v['error'][$key];
                    $files[$i]['type'] = $v['type'][$key];
                    $i++;
                }
            }
        }

        return $files;
    }


    public function fileUpload($path = "uploads", $allowExt = ["gif","jpeg","png","jpg","blob"],
                               $maxSize = 20971520000)
    {
        if (!file_exists($path)) {
            mkdir($path);
        }

        $i = 0;
        $uploadFiles = [];
        $files = $this->_fileInfo();
        if (!($files && is_array($files))) {
            return "error";
        }

        foreach ($files as $file) {
            if ($file['error'] == UPLOAD_ERR_OK) {
                $ext = Help::getExtName($file['name']);

                if (!in_array($ext, $allowExt)) {
                    exit("非文件类型");
                }
                if (!getimagesize($file['tmp_name'])) {
                    exit("不是真正的图片类型");
                }
                if ($file['size'] > $maxSize) {
                    exit("上传文件过大");
                }
                if (!is_uploaded_file($file['tmp_name'])) {
                    exit("不是通过HTTP POST方式上传上来的");
                }

                $filename = Help::getUniqueName() . "." . $ext;
                $destination = $path . "/" . $filename;

                if (move_uploaded_file($file['tmp_name'], $destination)) {
                    $file['name'] = $filename;
                    unset($file['tmp_name'], $file['size'], $file['type']);
                    $uploadFiles[$i] = $file;
                    $i++;
                }
            } else {
                switch ($file['error']) {
                    case 1:
                        $message = "超过了配置文件上传文件的大小";
                        break;
                    case 2:
                        $message = "超过了表单设置上传文件的大小";
                        break;
                    case 3:
                        $message = "文件部分被上传";
                        break;
                    case 4:
                        $message = "没有文件被上传";
                        break;
                    case 6:
                        $message = "没有找到临时目录";
                        break;
                    case 7:
                        $message = "文件不可写";
                        break;
                    case 8:
                        $message = "由于PHP的扩展程序中断了文件上传";
                        break;
                    default:
                        $message = "不可预知的错误";
                }
                echo $message;
            }
        }

        return $uploadFiles;
    }
}