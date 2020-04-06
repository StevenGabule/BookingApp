<?php

namespace App\Http\Controllers;

use App\Http\Resources\RestaurantResource;
use App\Restaurant;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    public function index()
    {
        $restaurants = Restaurant::latest()->get();
        return RestaurantResource::collection($restaurants);
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => ['required', 'min:6'],
            'short_description' => ['required', 'min:10', 'max:255'],
            'long_description' => ['required', 'min:20', 'max:255'],
            'avatar' => ['required']
        ]);

        // get the image
        $image = $request->avatar;
        $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
        \Image::make($request->avatar)->save(public_path('images/uploads/').$name);

        $restaurant = Restaurant::create([
            'name' => $request->name,
            'short_description' => $request->short_description,
            'long_description' => $request->long_description,
            'category' => $request->category,
            'avatar' => $name,
        ]);
        return response()->json(['data' => $restaurant]);
    }

    public function show(Restaurant $restaurant)
    {
        //
    }

    public function edit($id): RestaurantResource
    {
        $restaurant = Restaurant::findOrFail($id);
        return new RestaurantResource($restaurant);
    }

    public function update(Request $request, $id)
    {
        $restaurant = Restaurant::findOrFail($id);
        $old = $restaurant->avatar;
        $this->validate($request, [
            'name' => ['required', 'min:6'],
            'short_description' => ['required', 'min:10', 'max:255'],
            'long_description' => ['required', 'min:20', 'max:255'],
            'category' => ['required']
        ]);

        $image = $request->image;
        if ($image != $old) {
            $name = time() . '.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
            \Image::make($request->image)->save(public_path('images/uploads/') . $name);
            $file_path = public_path("images/uploads/{$old}");
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $restaurant->avatar = $name;
        }

        $restaurant->name = $request->name;
        $restaurant->short_description = $request->short_description;
        $restaurant->long_description = $request->long_description;
        $restaurant->category = $request->category;

        $restaurant->save();
        return new RestaurantResource($restaurant);
    }

    public function destroy($id)
    {
        $restaurant = Restaurant::findOrFail($id);
        $file_path = public_path("images/uploads/{$restaurant->avatar}");
        if (file_exists($file_path)) {
            unlink($file_path);
        }
        $restaurant->delete();
        return response()->json(['data' => 'Deleted Successful'], 200);
    }
}
