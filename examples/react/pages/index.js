import { number, record } from 'tastes'
import SamplerSlider from 'tastes/dist/components/SamplerSlider'

const dimensions = record({
  width: number({ min: 100, max: 1000 }),
  height: number({ min: 100, max: 1000 }),
})

export default () => (
  <SamplerSlider sampler={dimensions}>
    {({ width, height }) => (
      <article>
        <h1>Sea Otter</h1>
        <figure style={{ width: `${width}px`, height: `${height}px` }} />
        <p>
          The sea otter (Enhydra lutris) is a marine mammal native to the coasts
          of the northern and eastern North Pacific Ocean. Adult sea otters
          typically weigh between 14 and 45 kg (31 and 99 lb), making them the
          heaviest members of the weasel family, but among the smallest marine
          mammals. Unlike most marine mammals, the sea otter's primary form of
          insulation is an exceptionally thick coat of fur, the densest in the
          animal kingdom. Although it can walk on land, the sea otter lives
          mostly in the ocean.
        </p>
        <p>
          The sea otter inhabits offshore environments, where it dives to the
          sea floor to forage. It preys mostly on marine invertebrates such as
          sea urchins, various molluscs and crustaceans, and some species of
          fish. Its foraging and eating habits are noteworthy in several
          respects. First, its use of rocks to dislodge prey and to open shells
          makes it one of the few mammal species to use tools. In most of its
          range, it is a keystone species, controlling sea urchin populations
          which would otherwise inflict extensive damage to kelp forest
          ecosystems. Its diet includes prey species that are also valued by
          humans as food, leading to conflicts between sea otters and fisheries.
        </p>

        <style global jsx>{`
          html {
            color: #e6e6e6;
            background-color: black;
          }

          article {
            margin: 0 auto;
            max-width: 25em;
          }

          figure {
            background: url(https://wallpapercave.com/wp/l9p2TGv.jpg);
            background-size: cover;
            background-position: 70% 50%;
            background-repeat: no-repeat;

            margin: 0;
            max-width: 100%;
          }
        `}</style>
      </article>
    )}
  </SamplerSlider>
)
