/**
 * User Configuration.
 */
/** Map relative paths to URLs. */
var map = {};
/** User packages configuration. */
var packages = {};
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Everything underneath this line is managed by the CLI.
 */
var barrels = [
    // Angular specific barrels.
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/forms',
    '@angular/http',
    '@angular/router',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    // Thirdparty barrels.
    'rxjs',
    '@covalent/chips',
    '@covalent/core',
    '@covalent/highlight',
    '@covalent/http',
    '@covalent/file-upload',
    '@covalent/json-formatter',
    '@covalent/markdown',
    // App specific barrels.
    'app',
    'services',
];
var cliSystemConfigPackages = {};
barrels.forEach(function (barrelName) {
    cliSystemConfigPackages[barrelName] = { main: 'index' };
});
// Angular Material 2 Packages
var materialPackages = [
    'button',
    'card',
    'checkbox',
    'core',
    'icon',
    'input',
    'list',
    'progress-bar',
    'progress-circle',
    'radio',
    'sidenav',
    'tabs',
    'toolbar',
    'grid-list',
    'slide-toggle',
    'menu',
];
materialPackages.forEach(function (pkg) {
    var name = '@angular2-material/' + pkg;
    packages[name] = {
        defaultExtension: 'js',
        format: 'cjs',
        main: pkg + '.js',
    };
});
// Apply the CLI SystemJS configuration.
System.config({
    map: {
        '@angular': 'vendor/@angular',
        'rxjs': 'vendor/rxjs',
        '@angular2-material': 'vendor/@angular2-material',
        '@covalent': 'vendor/@covalent',
        'main': 'main.js',
    },
    packages: cliSystemConfigPackages,
});
// Apply the user's configuration.
System.config({ map: map, packages: packages, materialPackages: materialPackages });
//# sourceMappingURL=../system-config.js.map