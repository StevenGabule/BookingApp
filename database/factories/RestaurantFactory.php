<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Restaurant;
use Faker\Generator as Faker;
use Illuminate\Support\Carbon;

$factory->define(Restaurant::class, static function (Faker $faker) {

     return [
         'name' => $faker->name,
         'short_description' => $faker->text(50),
         'long_description' => $faker->paragraphs(3, true),
         'category' => $faker->word,
         'created_at' => Carbon::now(),
         'updated_at' => Carbon::now(),
     ];
});
