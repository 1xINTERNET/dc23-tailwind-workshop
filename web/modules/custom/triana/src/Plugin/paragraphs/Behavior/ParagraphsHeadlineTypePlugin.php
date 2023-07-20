<?php

namespace Drupal\triana\Plugin\paragraphs\Behavior;

use Drupal\Core\Entity\Display\EntityViewDisplayInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\paragraphs\Entity\ParagraphsType;
use Drupal\paragraphs\ParagraphsBehaviorBase;
use Drupal\paragraphs\ParagraphInterface;

/**
 * Provides a headline type plugin.
 *
 * @ParagraphsBehavior(
 *   id = "headline_type",
 *   label = @Translation("Paragraph Headline Type"),
 *   description = @Translation("Paragraph Headline Type behavior plugin"),
 *   weight = 1
 * )
 */
class ParagraphsHeadlineTypePlugin extends ParagraphsBehaviorBase {
  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildConfigurationForm($form, $form_state);
    $form['default_headline_type'] = [
      '#type' => 'select',
      '#title' => $this->t('Default headline type'),
      '#options' => array_merge($this->defaultConfiguration()['options'], $this->configuration['options']),
      '#default_value' => $this->configuration['default_headline_type'],
      '#description' => $this->t("Default headline type option for the paragraph."),
    ];
    $form['default_alignment'] = [
      '#type' => 'select',
      '#title' => $this->t('Default headline alignment'),
      '#options' => array_merge($this->defaultConfiguration()['alignment_options'], $this->configuration['alignment_options']),
      '#default_value' => $this->configuration['default_alignment'],
      '#description' => $this->t("Default headline alignment option for the paragraph."),
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitConfigurationForm(array &$form, FormStateInterface $form_state) {
    $this->configuration['default_headline_type'] = $form_state->getValue('default_headline_type');
    $this->configuration['default_alignment'] = $form_state->getValue('default_alignment');
    parent::submitConfigurationForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      'default_headline_type' => 'h2',
      'default_alignment' => 'left',
      'options' => [
        'h1' => $this->t('H1'),
        'h2' => $this->t('H2'),
        'h3' => $this->t('H3'),
        'h4' => $this->t('H4'),
        'h5' => $this->t('H5'),
        'h6' => $this->t('H6')
       ],
      'alignment_options' => [
        'left' => $this->t('Left'),
        'center' => $this->t('Center'),
        'right' => $this->t('Right'),
      ]
    ] + parent::defaultConfiguration();
  }

  /**
   * {@inheritdoc}
   */
  public function buildBehaviorForm(ParagraphInterface $paragraph, array &$form, FormStateInterface $form_state) {
    $form['headline_type'] = [
      '#type' => 'select',
      '#title' => $this->t('Headline type'),
      '#weight' => 50,
      '#options' => array_merge($this->defaultConfiguration()['options'], $this->configuration['options']),
      '#default_value' => $paragraph->getBehaviorSetting($this->getPluginId(), 'headline_type', $this->configuration['default_headline_type']),
      '#description' => $this->t("Headline type to use."),
    ];
    $form['headline_alignment'] = [
      '#type' => 'select',
      '#title' => $this->t('Headline alignment'),
      '#weight' => 51,
      '#options' => array_merge($this->defaultConfiguration()['alignment_options'], $this->configuration['alignment_options']),
      '#default_value' => $paragraph->getBehaviorSetting($this->getPluginId(), 'headline_alignment', $this->configuration['default_alignment']),
      '#description' => $this->t("Headline alignment to use."),
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
    parent::preprocess($variables);
    $variables['headline_type'] = $variables['paragraph']->getBehaviorSetting($this->getPluginId(), 'headline_type', $this->configuration['default_headline_type']);
    $variables['headline_alignment'] = $variables['paragraph']->getBehaviorSetting($this->getPluginId(), 'headline_alignment', $this->configuration['default_alignment']);
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary(Paragraph $paragraph) {
    $summary = [];
    $headline_type = $paragraph->getBehaviorSetting($this->pluginId, 'headline_type');
    if ($headline_type) {
      $summary[] = $this->t('Headline type: @ht', ['@ht' => $this->configuration['options'][$headline_type]]);
    }
    $headline_alignment = $paragraph->getBehaviorSetting($this->pluginId, 'headline_alignment');
    if ($headline_alignment) {
      $summary[] = $this->t('Headline alignment: @ht', ['@ht' => $this->configuration['alignment_options'][$headline_alignment]]);
    }
    return $summary;
  }

  /**
   * {@inheritDoc}
   */
  public static function isApplicable(ParagraphsType $paragraphs_type) {
    return ($paragraphs_type->id() == 'headline');
  }

}
