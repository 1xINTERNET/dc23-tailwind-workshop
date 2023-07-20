import '../tailwind.css'

export default {
  title: 'Typography'
}

export const Typography = () => {
  return `
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>

    <br>
<!--
    <p class="lead">Lead paragraph</p>
    <p class="lead">Suspendisse non nunc sapien. <i>Orci varius natoque penatibus</i> et magnis dis parturient montes, <span class="font-bold">nascetur ridiculus mus</span>. Donec sed dignissim leo. Sed non mi neque. Nam fermentum massa ut pellentesque pharetra. Pellentesque tincidunt mi sed tincidunt ultricies.</p>

    <br>
-->    
    <p>Default paragraph</p>
    <p>Suspendisse non nunc sapien. <i>Orci varius natoque penatibus</i> et magnis dis parturient montes, <span class="font-bold">nascetur ridiculus mus</span>. Donec sed dignissim leo. Sed non mi neque. Nam fermentum massa ut pellentesque pharetra. Pellentesque tincidunt mi sed tincidunt ultricies.</p>

    <br>
<!--
    <p class="small">Small paragraph</p>
    <p class="small">Suspendisse non nunc sapien. <i>Orci varius natoque penatibus</i> et magnis dis parturient montes, <span class="font-bold">nascetur ridiculus mus</span>. Donec sed dignissim leo. Sed non mi neque. Nam fermentum massa ut pellentesque pharetra. Pellentesque tincidunt mi sed tincidunt ultricies.</p>

    <br>
-->  
    <div class="caption">This is a caption</div>

    <br>
  `
}

Typography.parameters = {
  controls: { hideNoControlsWarning: true }
}
