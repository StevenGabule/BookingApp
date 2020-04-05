<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Restaurant;
use Faker\Generator as Faker;
use Illuminate\Support\Carbon;

$factory->define(Restaurant::class, static function (Faker $faker) {
    $email = $faker->safeEmail;
    $size = 30;
    $grav_url = 'https://www.gravatar.com/avatar/' . md5( strtolower( trim( $email ) ) )  . '&s=' . $size;
     return [
         'name' => $faker->name,
         'short_description' => $faker->text(50),
         'long_description' => $faker->paragraphs(3, true),
         'category' => $faker->word,
         'avatar' => $grav_url,
         'created_at' => Carbon::now(),
         'updated_at' => Carbon::now(),
     ];
});
