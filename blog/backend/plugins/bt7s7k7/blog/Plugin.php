<?php namespace Bt7s7k7\Blog;

use Backend;
use System\Classes\PluginBase;

/**
 * Blog Plugin Information File
 */
class Plugin extends PluginBase
{
    /**
     * Returns information about this plugin.
     *
     * @return array
     */
    public function pluginDetails()
    {
        return [
            'name' => 'Blog',
            'description' => 'No description provided yet...',
            'author' => 'bt7s7k7',
            'icon' => 'icon-leaf',
        ];
    }

    /**
     * Register method, called when the plugin is first registered.
     *
     * @return void
     */
    public function register()
    {

    }

    /**
     * Boot method, called right before the request route.
     *
     * @return array
     */
    public function boot()
    {

    }

    /**
     * Registers any front-end components implemented in this plugin.
     *
     * @return array
     */
    public function registerComponents()
    {
        return []; // Remove this line to activate

        return [
            'Bt7s7k7\Blog\Components\MyComponent' => 'myComponent',
        ];
    }

    /**
     * Registers any back-end permissions used by this plugin.
     *
     * @return array
     */
    public function registerPermissions()
    {
        return []; // Remove this line to activate

        return [
            'bt7s7k7.blog.some_permission' => [
                'tab' => 'Blog',
                'label' => 'Some permission',
            ],
        ];
    }

    /**
     * Registers back-end navigation items for this plugin.
     *
     * @return array
     */
    public function registerNavigation()
    {
        return [
            'pages' => [
                'label' => 'Page',
                'url' => Backend::url('bt7s7k7/blog/pages'),
                'icon' => 'icon-leaf',
                'permissions' => ['bt7s7k7.blog.*'],
                'order' => 500,
            ],
            'posts' => [
                'label' => 'Post',
                'url' => Backend::url('bt7s7k7/blog/posts'),
                'icon' => 'icon-leaf',
                'permissions' => ['bt7s7k7.blog.*'],
                'order' => 500,
            ],
        ];
    }
}
