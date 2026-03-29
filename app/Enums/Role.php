<?php
namespace App\Enums;

enum Role: int {

    case SUPER_ADMIN = 1;
    case STUDENT     = 2;
    case TEACHER     = 3;
    case PARENT      = 4;
    case COUNSELLOR  = 5;

    public function label(): string
    {
        return match ($this) {

            self::SUPER_ADMIN => 'Super Admin',
            self::STUDENT     => 'Student',
            self::TEACHER     => 'Teacher',
            self::PARENT      => 'Parent',
            self::COUNSELLOR  => 'Counsellor',
        };
    }

}
