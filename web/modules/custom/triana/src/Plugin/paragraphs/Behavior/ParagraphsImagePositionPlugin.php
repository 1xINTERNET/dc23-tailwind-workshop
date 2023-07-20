<?php

namespace Drupal\triana\Plugin\paragraphs\Behavior;

use Drupal\Core\Entity\Display\EntityViewDisplayInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\paragraphs\Entity\ParagraphsType;
use Drupal\paragraphs\ParagraphsBehaviorBase;
use Drupal\paragraphs\ParagraphInterface;

/**
 * Provides a test feature plugin.
 *
 * @ParagraphsBehavior(
 *   id = "paragraph_image_position",
 *   label = @Translation("Paragraph Image position"),
 *   description = @Translation("Default image position option for the paragraph"),
 *   weight = 1
 * )
 */
class ParagraphsImagePositionPlugin extends ParagraphsBehaviorBase {

  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildConfigurationForm($form, $form_state);
    $form['default_image_position'] = [
      '#type' => 'select',
      '#title' => $this->t('Image position'),
      '#options' => array_merge($this->defaultConfiguration()['options'], $this->configuration['options']),
      '#default_value' => $this->configuration['default_image_position'],
      '#description' => $this->t("Default image position option for the paragraph."),
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitConfigurationForm(array &$form, FormStateInterface $form_state) {
    $this->configuration['default_image_position'] = $form_state->getValue('default_image_position');
    parent::submitConfigurationForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
        'default_image_position' => 'image_left',
        'options' => [
          'image_left' => $this->t('Left'),
          'image_right' => $this->t('Right'),
        ]
      ] + parent::defaultConfiguration();
  }

  /**
   * {@inheritdoc}
   */
  public function buildBehaviorForm(ParagraphInterface $paragraph, array &$form, FormStateInterface $form_state) {
    $form['image_position'] = [
      '#type' => 'select',
      '#title' => $this->t('Image position'),
      '#weight' => 50,
      '#options' => array_merge($this->defaultConfiguration()['options'], $this->configuration['options']),
      '#default_value' => $paragraph->getBehaviorSetting($this->getPluginId(), 'image_position', $this->configuration['default_image_position']),
      '#description' => $this->t("Image position for the paragraph."),
    ];

    // Returning an empty array will make the behaviors show up in the paragraph content form.
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function view(array &$build, Paragraph $paragraphs_entity, EntityViewDisplayInterface $display, $view_mode) {}

  /**
   * {@inheritdoc}
   */
  public function preprocess(&$variables) {
    $variables['data_position'] = $variables['paragraph']->getBehaviorSetting($this->pluginId, 'image_position', 'image_left');
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary(Paragraph $paragraph) {
    $image_position = $paragraph->getBehaviorSetting($this->pluginId, 'image_position');
    if (!empty($image_position)) {
      return [$this->t('Image position: @image_position', ['@image_position' => $this->configuration['options'][$image_position]])];
    } else {
      return [];
    }
  }

  /**
   * {@inheritdoc}
   */
  public static function isApplicable(ParagraphsType $paragraphs_type) {
    return $paragraphs_type->id() == 'image_text';
  }

}
