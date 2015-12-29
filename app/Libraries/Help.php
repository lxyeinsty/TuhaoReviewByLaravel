<?php

namespace App\Libraries;

class Help
{
    public function buildRandomString()
    {
        $chars = array();

        for ($i = 0; $i < 4; $i++) {
            $data = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
            $fontContent = substr($data, rand(0, strlen($data)), 1);
            $chars[] = $fontContent;
        }

        $string = implode("", $chars);
        return $string;
    }


    public function getUniqueName()
    {
        return md5(uniqid(microtime(true), true));
    }


    public function getExtName($filename)
    {
        $array = explode(".", $filename);
        return strtolower(end($array));
    }


    public function checkMobile()
    {
        global $_G;
        static $mobileBrowserList = ['iphone', 'android', 'phone', 'mobile', 'wap', 'netfront', 'java', 'opera mobi', 'opera mini',
            'ucweb', 'windows ce', 'symbian', 'series', 'webos', 'sony', 'blackberry', 'dopod', 'nokia', 'samsung',
            'palmsource', 'xda', 'pieplus', 'meizu', 'midp', 'cldc', 'motorola', 'foma', 'docomo', 'up.browser',
            'up.link', 'blazer', 'helio', 'hosin', 'huawei', 'novarra', 'coolpad', 'webos', 'techfaith', 'palmsource',
            'alcatel', 'amoi', 'ktouch', 'nexian', 'ericsson', 'philips', 'sagem', 'wellcom', 'bunjalloo', 'maui', 'smartphone',
            'iemobile', 'spice', 'bird', 'zte-', 'longcos', 'pantech', 'gionee', 'portalmmm', 'jig browser', 'hiptop',
            'benq', 'haier', '^lct', '320x320', '240x320', '176x220'];

        $userAgent = strtolower($_SERVER['HTTP_USER_AGENT']);
        if (($v = $this->dstrpos($userAgent, $mobileBrowserList, true))) {
            $_G['mobile'] = $v;
            return true;
        }

        $brower = ['mozilla', 'chrome', 'safari', 'opera', 'm3gate', 'winwap', 'openwave', 'myop'];
        if ($this->dstrpos($userAgent, $brower)) {
            return false;
        }
        $_G['mobile'] = 'unknown';
        if ($_GET['mobile'] === 'yes') {
            return true;
        } else {
            return false;
        }
    }


    public function dstrpos($string, &$arr, $returnValue = false) {
        if (empty($string)) {
            return false;
        }

        foreach((array)$arr as $v) {
            if(strpos($string, $v) !== false) {
                $return = $returnValue ? $v : true;
                return $return;
            }
        }


        return false;
    }


    public function thumb($filename, $destination = null, $dstW = null, $dstH = null,
                          $scale = 0.5)
    {
        list($srcW, $srcH, $imageType) = getimagesize($filename);
        if (is_null($dstW) || is_null($dstH)) {
            $dstW = ceil($srcW * $scale);
            $dstH = ceil($srcH * $scale);
        }

        $mime = image_type_to_mime_type($imageType);
        $createFun = str_replace("/", "createfrom", $mime);
        $outFun = str_replace("/", null, $mime);
        $srcImage = $createFun($filename);
        $dstImage = imagecreatetruecolor($dstW, $dstH);
        imagecopyresampled($dstImage, $srcImage, 0,  0, 0, 0, $dstW, $dstH, $srcW, $srcH);
        if ($destination && !file_exists(dirname($destination))) {
            mkdir(dirname($destination) , 0777, true);
        }

        $dstFilename = $destination;
        $outFun($dstImage, $dstFilename);
        imagedestroy($srcImage);
        imagedestroy($dstImage);

        return $dstFilename;
    }

}





