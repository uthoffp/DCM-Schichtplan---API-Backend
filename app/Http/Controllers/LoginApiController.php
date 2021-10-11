<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginApiController extends Controller
{
    public function authorize($ability, $arguments = [])
    {
        echo "login";
    }
}
