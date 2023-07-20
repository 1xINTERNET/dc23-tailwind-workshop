<?php

namespace Drupal\triana\Plugin\paragraphs\Behavior;

use Drupal\Core\Entity\Display\EntityViewDisplayInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\paragraphs\ParagraphsBehaviorBase;
use Drupal\paragraphs\ParagraphInterface;

/**
 * Provides a paragraph layout behavior plugin for paragraph type.
 *
 * @ParagraphsBehavior(
 *   id = "paragraph_teaser_layout",
 *   label = @Translation("Paragraph layout"),
 *   description = @Translation("Paragraph layout behavior plugin."),
 *   weight = 1
 * )
 */
class ParagraphsLayoutPlugin extends ParagraphsBehaviorBase {
  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildConfigurationForm($form, $form_state);
    $form['default_teaser_layout'] = [
      '#type' => 'select',
      '#title' => $this->t('Default layout'),
      '#options' => array_merge($this->defaultConfiguration()['options'], $this->configuration['options']),
      '#default_value' => $this->configuration['default_teaser_layout'],
      '#description' => $this->t("Default layout option for the paragraph."),
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitConfigurationForm(array &$form, FormStateInterface $form_state) {
    $this->configuration['default_teaser_layout'] = $form_state->getValue('default_teaser_layout');
    parent::submitConfigurationForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      'default_teaser_layout' => 'one_column',
      'options' => [
        'one_column' => $this->t('One column grid'),
        'two_columns' => $this->t('Two column grid'),
        'block_of_three' => $this->t('Three column grid'),
        'four_columns' => $this->t('Four column grid'),
      ]
    ] + parent::defaultConfiguration();
  }

  /**
   * {@inheritdoc}
   */
  public function buildBehaviorForm(ParagraphInterface $paragraph, array &$form, FormStateInterface $form_state) {
    $form['teaser_layout'] = [
      '#type' => 'select',
      '#title' => $this->t('Layout'),
      '#weight' => 50,
      '#options' => array_merge($this->defaultConfiguration()['options'], $this->configuration['options']),
      '#default_value' => $paragraph->getBehaviorSetting($this->getPluginId(), 'teaser_layout', $this->configuration['default_teaser_layout']),
      '#description' => $this->t("Layout for the paragraph."),
    ];

    // Returning an empty array will make the behaviors show up in the paragraph content form.
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function view(array &$build, Paragraph $paragraphs_entity, EntityViewDisplayInterface $display, $view_mode) {
    if ($layout = $paragraphs_entity->getBehaviorSetting($this->getPluginId(), 'teaser_layout')) {
      $build['#layout'] = $layout;
    }
  }

  /**
   * Populate the variables according to the layout settings.
   *
   * @param array $variables
   *   Array of variables for rendering.
   * @param string $layout
   *   Machine name of the layout.
   */
  static function populateVariables(&$variables, $layout) {
    switch ($layout) {
      case 'one_column':
        $variables['grid_cols'] = 1;
        break;
      case 'two_columns':
        $variables['grid_cols'] = 2;
        break;
      case 'block_of_three':
        $variables['grid_cols'] = 3;
        break;
      case 'four_columns':
        $variables['grid_cols'] = 4;
        break;
    }
  }

  /**
   * {@inheritdoc}
   */
  public function preprocess(&$variables) {
    if ($layout = $variables['paragraph']->getBehaviorSetting($this->getPluginId(), 'teaser_layout')) {
      self::populateVariables($variables, $layout);
    }
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary(Paragraph $paragraph) {
    $layout = $paragraph->getBehaviorSetting($this->pluginId, 'teaser_layout');
    if ($layout) {
      return [$this->t('Layout: @layout', ['@layout' => $this->configuration['options'][$layout]])];
    } else {
      return [];
    }
  }
}
