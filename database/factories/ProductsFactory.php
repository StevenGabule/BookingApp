<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Product;
use Faker\Generator as Faker;
use Illuminate\Support\Carbon;

$factory->define(Product::class, static function (Faker $faker) {
    return [
        'name' => $faker->name,
        'long_description' => $faker->paragraphs(3, true),
        'short_description' => $faker->text(50),
        'category' => $faker->word,
        'avatar' => 'https://source.unsplash.com/random/300x300',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
    ];
});
