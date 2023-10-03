# DC23 Tailwind as hybrid single point of truth

## Setup

### Drupal

1. To start the project run `ddev start && ddev composer install`
2. To import the demo database run `ddev import-db --src=./resources/db-drupalcon-lille.sql && ddev drush cr`
3. To launch the project run `ddev launch`
4. To login into the site run `ddev drush uli`

### Theme, design system and app

1. In `../web/themes/custom/DemoDesign/design-system` run `nvm use`
2. In `../web/themes/custom/DemoDesign/design-system` run `npm i && npm run build`
3. In `../web/themes/custom/DemoDesign/react-app` run `npm i && npm run build`
4. In `../web/themes/custom/DemoDesign/` run `npm i && npm run build`
5. Wherever run `ddev drush cr`

## Development

1. Check the design system's storybook, in `../web/themes/custom/DemoDesign/design-system` run `npm start`
2. Check the react app, in `../web/themes/custom/DemoDesign/react-app` run `npm start`
