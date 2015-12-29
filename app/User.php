<?php

namespace App;

class User extends Base
{
    public $timestamps = false;

    protected $table = 'tuhao_user';

    protected $guarded = [];

    protected $visible = ['id', 'username', 'email'];


    public function hasInfo()
    {
        return  $this->hasOne('App\Info', 'user_id', 'id');
    }


    public static function register($action, array $userArgs, array $infoArgs)
    {
        if ($action == 'username') {
            if ($row = self::where('username', $userArgs['username'])->first()) {
                return self::fail('用户名被占用');
            }

            return self::success();
        } elseif ($action == 'email') {
            if ($row = self::where('email', $userArgs['email'])->first()) {
                return self::fail('邮箱被占用');
            }

            return self::success();
        } elseif ($action == 'save') {
            $data = [
                'username' => $userArgs['username'],
                'password' => md5($userArgs['password']),
                'email' => $userArgs['email'],
                'token' => md5($userArgs['email'] . time()),
                'token_exptime' => time() + 7 * 60 * 60 * 24,
                'reg_time' => time()
            ];

            $user = self::create($data);
            $infoArgs['id'] = $user->id;
            Info::store($infoArgs);

            return $user;
        }
    }


    public static function edit(array $args)
    {
        $arrName = ['username' => $args['username']];
        $arrColl = [
            'college' => $args['college'],
            'address' => $args['address']
        ];

        $user = User::find($args['id']);
        $info = $user->hasInfo;
        $allGoods = Goods::where('username', $user->username)->get();

        if ($user->update($arrName) && $info->update($arrColl)) {
            if ($allGoods) {
                foreach ($allGoods as $aGoods) {
                    $aGoods->update($arrName);
                }
            }
            $user = User::find($args['id']);
            $info = $user->hasInfo;
            $data = [
                'id' => $user->id,
                'name' => $user->username,
                'college' => $info->college,
                'address' => $info->address
            ];

            return self::success($data);
        }

        return self::fail();

    }

}
