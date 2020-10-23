<?php namespace Bt7s7k7\Blog\Updates;

use October\Rain\Database\Schema\Blueprint;
use October\Rain\Database\Updates\Migration;
use Schema;

class CreatePostsTable extends Migration
{
    public function up()
    {
        Schema::create('bt7s7k7_blog_posts', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->timestamps();
            $table->string('author_name');
            $table->string('label');
        });
    }

    public function down()
    {
        Schema::dropIfExists('bt7s7k7_blog_posts');
    }
}
