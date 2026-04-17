<?php
namespace App\Traits;

trait ImageUpload
{
    public function ImageUpload($image, $folder, $name)
    {

        $extension      = $image->getClientOriginalExtension();
        $time           = time();
        $new_image_name = $name . $time . "." . $extension;

        $image->move(public_path('storage/' . $folder), $new_image_name);

        return $new_image_name;

    }

}
