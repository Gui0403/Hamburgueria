<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BurgerController;

use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);

// PUBLICO - cardápio
Route::get('/burgers', [BurgerController::class, 'index']);
Route::get('/burgers/{burger}', [BurgerController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {

    // auth
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // CRUD admin
    Route::post('/burgers', [BurgerController::class, 'store']);
    Route::put('/burgers/{burger}', [BurgerController::class, 'update']);
    Route::delete('/burgers/{burger}', [BurgerController::class, 'destroy']);
});