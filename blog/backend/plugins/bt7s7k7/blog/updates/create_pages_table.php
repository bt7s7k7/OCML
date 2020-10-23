<?php namespace Bt7s7k7\Blog\Updates;

use October\Rain\Database\Schema\Blueprint;
use October\Rain\Database\Updates\Migration;
use Schema;

class CreatePagesTable extends Migration
{
    public function up()
    {
        Schema::create('bt7s7k7_blog_pages', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->timestamps();
            $table->integer('post_id')->index();
            $table->integer('position');
            $table->string('label');
            $table->string('content');
        });
    }

    public function down()
    {
        Schema::dropIfExists('bt7s7k7_blog_pages');
    }
}
