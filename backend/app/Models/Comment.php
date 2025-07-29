<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Article; 
class Comment extends Model
{
     protected $fillable = ['author_name', 'content'];
    use HasFactory;
    public function article()
    {
        return $this->belongsTo(Article::class);
    }

}
