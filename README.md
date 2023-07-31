# DC23 Tailwind as hybrid single point of truth

## Setup

### Drupal

1. To start the project run `ddev start && ddev composer install`
2. To import the demo database run `ddev import-db --src=./resources/demo-database.sql.gz && ddev drush cr`
3. To launch the project run `ddev launch`
4. To login into the site run `ddev drush uli`

### Theme, design system and app

1. In `../web/themes/custom/DemoDesign/design-system` run `nvm use`
2. In `../web/themes/custom/DemoDesign/design-system` run `npm i`
3. In `../web/themes/custom/DemoDesign/react-app` run `npm i`
4. In `../web/themes/custom/DemoDesign/` `npm install`

## Development

1. Check the storybook, in `../web/themes/custom/DemoDesign/design-system` run `npm start`
2. Check the app, in `../web/themes/custom/DemoDesign/react-app` run `npm start`

## Build

1. In `../web/themes/custom/DemoDesign/design-system` run `npm run build`
2. In `../web/themes/custom/DemoDesign/react-app` run `npm run build`
3. In `../web/themes/custom/DemoDesign/` run `npm run build`
