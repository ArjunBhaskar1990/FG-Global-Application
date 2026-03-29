<?php
namespace App\Enums;

enum StudentStatus: int {

    case PENDING     = 0;
    case TEST        = 1;
    case COUNSELLING = 2;
    case STUDENT     = 3;
    case REJECTED    = 4;

    public function label(): String
    {
        return match ($this) {

            self::PENDING     => "Pending",
            self::TEST        => "Test",
            self::COUNSELLING => "Counselling",
            self::STUDENT     => "Student",
            self::REJECTED    => "Rejected"

        };

    }

}
