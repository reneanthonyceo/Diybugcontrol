/**
 * PLACEHOLDER CATALOG — not real products.
 *
 * Every SKU, price, rating, review, and claim in this file is invented to
 * exercise the templates. Replace wholesale before this site goes near a
 * customer. Efficacy and safety copy in particular must come from the actual
 * product label, since that text is regulated.
 */

export type Glyph =
  | 'bug'
  | 'ant'
  | 'bedbug'
  | 'termite'
  | 'spider'
  | 'flea'
  | 'rodent'
  | 'mosquito'
  | 'spray'
  | 'trap'
  | 'granule';

export interface Pest {
  slug: string;
  name: string;
  /** Short label used in the pest finder grid. */
  shortName: string;
  glyph: Glyph;
  /** One-line problem statement, written from the customer's side. */
  tagline: string;
  signs: string[];
  /** Ordered treatment steps for the pest landing page. */
  steps: { title: string; detail: string }[];
  /** Product slugs, in recommended order. */
  recommended: string[];
}

export interface Review {
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  pest?: string;
}

export interface Product {
  slug: string;
  name: string;
  glyph: Glyph;
  price: number;
  /** Unit shown next to the price, e.g. "4 pack". */
  unit: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  badge?: string;
  summary: string;
  kills: string[];
  useWhere: string[];
  coverage: string;
  applicationSteps: string[];
  safety: string[];
  /** Pest slugs this product treats. */
  pests: string[];
  reviews: Review[];
  /** Distribution of 5,4,3,2,1-star reviews as percentages. */
  ratingBreakdown: [number, number, number, number, number];
}

export const pests: Pest[] = [
  {
    slug: 'cockroaches',
    name: 'Cockroaches',
    shortName: 'Roaches',
    glyph: 'bug',
    tagline: 'They hide by day and breed fast. Bait beats spray.',
    signs: [
      'Small dark droppings that look like coffee grounds',
      'A musty, oily smell near cabinets',
      'Egg cases (oothecae) behind appliances',
      'Sightings in daylight, which usually means a large population',
    ],
    steps: [
      { title: 'Find the harborage', detail: 'Check under the sink, behind the fridge, and inside the motor housing of warm appliances. Roaches stay within about 10 feet of food and water.' },
      { title: 'Place gel bait, do not spray', detail: 'Spraying scatters the colony and makes the problem harder to solve. Place small bait dots at corners and cracks instead.' },
      { title: 'Break the egg cycle', detail: 'Follow with an insect growth regulator so newly hatched nymphs never reach breeding age.' },
      { title: 'Re-bait at two weeks', detail: 'Consumption drops sharply once the population collapses. That drop is your signal it worked.' },
    ],
    recommended: ['roach-gel-bait', 'insect-growth-regulator', 'glue-board-monitors'],
  },
  {
    slug: 'ants',
    name: 'Ants',
    shortName: 'Ants',
    glyph: 'ant',
    tagline: 'Killing the trail does nothing. You have to reach the colony.',
    signs: [
      'A steady line of workers along a wall edge or counter seam',
      'Small piles of fine soil at pavement cracks',
      'Winged swarmers indoors in spring',
      'Activity clustered around sweet or greasy spills',
    ],
    steps: [
      { title: 'Leave the trail alone', detail: 'The trail is how bait gets carried home. Wiping it away restarts the process.' },
      { title: 'Set bait stations on the trail', detail: 'Place stations directly along the line, not where you wish the ants were.' },
      { title: 'Expect more ants first', detail: 'Recruitment rises for two to three days as workers carry bait back. That is the treatment working.' },
      { title: 'Treat the perimeter outdoors', detail: 'Once indoor activity stops, a perimeter barrier keeps the next colony out.' },
    ],
    recommended: ['ant-bait-stations', 'perimeter-concentrate', 'pump-sprayer'],
  },
  {
    slug: 'bed-bugs',
    name: 'Bed bugs',
    shortName: 'Bed bugs',
    glyph: 'bedbug',
    tagline: 'Slow, methodical, and entirely doable — but not in one pass.',
    signs: [
      'Rust-colored spotting along mattress seams',
      'Bites in a line or cluster, often on arms and shoulders',
      'Shed skins in the bed frame joints',
      'A sweet, musty odor in heavy infestations',
    ],
    steps: [
      { title: 'Contain first', detail: 'Bag bedding and run it hot. Do not move items to another room, which is the most common way a localized problem spreads.' },
      { title: 'Treat seams and joints', detail: 'Focus on mattress seams, box spring corners, and every screw joint in the frame.' },
      { title: 'Encase the mattress', detail: 'Encasements trap what survives and make future inspection far easier.' },
      { title: 'Repeat at 10 to 14 days', detail: 'Eggs are not reliably killed by contact treatment. The second pass is what ends it.' },
    ],
    recommended: ['bed-bug-spray', 'insect-growth-regulator', 'glue-board-monitors'],
  },
  {
    slug: 'mice-and-rats',
    name: 'Mice and rats',
    shortName: 'Rodents',
    glyph: 'rodent',
    tagline: 'Trapping works. Sealing the entry is what keeps it fixed.',
    signs: [
      'Droppings along walls and inside drawers',
      'Gnaw marks on packaging or wiring',
      'Scratching in walls or ceilings after dark',
      'Greasy rub marks where they run the same route nightly',
    ],
    steps: [
      { title: 'Read the runway', detail: 'Rodents run walls, not open floor. Place traps perpendicular to the wall with the trigger against it.' },
      { title: 'Set more traps than feels sensible', detail: 'Under-trapping is the single most common mistake. Six traps for a mouse problem, not one.' },
      { title: 'Seal every opening', detail: 'A mouse fits through a quarter-inch gap. Steel wool and sealant at pipe entries and door sweeps.' },
      { title: 'Remove the food', detail: 'Airtight storage and clean pet-food areas make traps the most attractive option in the room.' },
    ],
    recommended: ['snap-trap-kit', 'glue-board-monitors'],
  },
  {
    slug: 'mosquitoes',
    name: 'Mosquitoes',
    shortName: 'Mosquitoes',
    glyph: 'mosquito',
    tagline: 'Standing water is the whole game. Fogging is the finish.',
    signs: [
      'Biting concentrated at dawn and dusk',
      'Activity near shaded, damp ground cover',
      'Larvae wriggling in any container that has held water for a week',
    ],
    steps: [
      { title: 'Dump every container', detail: 'Saucers, gutters, tarps, toys, birdbaths. A bottle cap of water is enough to breed in.' },
      { title: 'Treat what you cannot dump', detail: 'Use a larvicide in rain barrels and low spots that stay wet.' },
      { title: 'Fog the resting sites', detail: 'Adults rest on the underside of foliage and fence lines during the day. Treat those, not open lawn.' },
      { title: 'Reapply after heavy rain', detail: 'Rain both resets breeding sites and washes residual treatment off foliage.' },
    ],
    recommended: ['mosquito-fogger-concentrate', 'pump-sprayer', 'perimeter-concentrate'],
  },
  {
    slug: 'termites',
    name: 'Termites',
    shortName: 'Termites',
    glyph: 'termite',
    tagline: 'Structural risk. Treat promptly, and get an inspection.',
    signs: [
      'Mud tubes running up a foundation wall',
      'Wood that sounds hollow when tapped',
      'Discarded wings near windowsills after a swarm',
      'Paint that looks blistered or uneven over wood',
    ],
    steps: [
      { title: 'Confirm what you have', detail: 'Termite swarmers have equal-length wings; flying ants do not. The treatment is completely different.' },
      { title: 'Treat active tubes', detail: 'Foam expands into the galleries where liquid will not reach.' },
      { title: 'Establish a barrier', detail: 'A treated perimeter trench interrupts the route between soil colony and structure.' },
      { title: 'Get a professional inspection', detail: 'DIY treatment can stop active feeding. It cannot assess structural damage, and that assessment matters.' },
    ],
    recommended: ['termite-foam', 'perimeter-concentrate'],
  },
  {
    slug: 'spiders',
    name: 'Spiders',
    shortName: 'Spiders',
    glyph: 'spider',
    tagline: 'Spiders follow their food. Cut the insects and they leave.',
    signs: [
      'Webbing in corners, eaves, and window frames',
      'Egg sacs in undisturbed storage areas',
      'A rise in sightings when other insects are abundant',
    ],
    steps: [
      { title: 'Remove webs mechanically', detail: 'Sweeping webs and egg sacs removes the next generation directly.' },
      { title: 'Treat the food source', detail: 'A perimeter treatment that reduces flies and gnats reduces spiders within weeks.' },
      { title: 'Seal and light-manage', detail: 'Door sweeps and warmer exterior bulbs cut the insects that draw spiders to entryways.' },
    ],
    recommended: ['perimeter-concentrate', 'glue-board-monitors', 'pump-sprayer'],
  },
  {
    slug: 'fleas',
    name: 'Fleas',
    shortName: 'Fleas',
    glyph: 'flea',
    tagline: 'Treat the pet and the house on the same day, or you start over.',
    signs: [
      'Pets scratching persistently',
      'Black specks in pet bedding that turn red when damp',
      'Bites around the ankles',
    ],
    steps: [
      { title: 'Treat the pet first', detail: 'Use a veterinary product on the animal. Household treatment alone never resolves a flea problem.' },
      { title: 'Vacuum thoroughly, then discard the bag', detail: 'Vacuuming also triggers pupae to emerge, which makes the treatment more effective.' },
      { title: 'Treat carpet and bedding', detail: 'Focus where the pet sleeps and rests. That is where the eggs are.' },
      { title: 'Repeat in two weeks', detail: 'Pupae are resistant to almost everything. The follow-up catches what emerged since.' },
    ],
    recommended: ['flea-carpet-powder', 'insect-growth-regulator', 'perimeter-concentrate'],
  },
];

export const products: Product[] = [
  {
    slug: 'roach-gel-bait',
    name: 'Roach Gel Bait',
    glyph: 'bug',
    price: 34.99,
    unit: '4 pack',
    rating: 4.7,
    reviewCount: 1284,
    inStock: true,
    badge: 'Best seller',
    summary:
      'Slow-acting gel that workers carry back to the harborage. Kills the roaches you see and the ones you do not.',
    kills: ['German cockroaches', 'American cockroaches', 'Oriental cockroaches', 'Brown-banded cockroaches'],
    useWhere: ['Under sinks', 'Behind and beneath appliances', 'Cabinet hinges and corners', 'Cracks and crevices'],
    coverage: 'Up to 500 sq ft per syringe',
    applicationSteps: [
      'Place pea-sized dots every 12 inches along cracks and corners.',
      'Concentrate placements within 10 feet of food and water sources.',
      'Do not spray insecticide near bait — it repels roaches away from it.',
      'Check placements at 7 days and re-apply where bait has been consumed.',
    ],
    safety: [
      'Keep out of reach of children and pets.',
      'Place bait inside cracks and voids, not on open surfaces.',
      'Wash hands after handling.',
    ],
    pests: ['cockroaches'],
    ratingBreakdown: [78, 14, 4, 2, 2],
    reviews: [
      { author: 'Marcus T.', rating: 5, date: '2026-06-14', title: 'Gone in about ten days', body: 'Kitchen was bad enough that I saw them during the day. Placed dots under the sink and behind the fridge like the instructions said. Activity spiked for two days then dropped off a cliff. Nothing for three weeks now.', verified: true, pest: 'cockroaches' },
      { author: 'Priya N.', rating: 5, date: '2026-05-30', title: 'The no-spray rule matters', body: 'First attempt I sprayed and baited at the same time and got nowhere. Read the directions properly, baited only, and it worked. Follow the instructions exactly.', verified: true, pest: 'cockroaches' },
      { author: 'Dana R.', rating: 4, date: '2026-05-02', title: 'Works, but be patient', body: 'Took closer to three weeks in an older building where I think they were coming from a neighbor. Still working, just slower than I expected.', verified: true, pest: 'cockroaches' },
    ],
  },
  {
    slug: 'ant-bait-stations',
    name: 'Advanced Ant Bait Stations',
    glyph: 'trap',
    price: 19.99,
    unit: '8 pack',
    rating: 4.5,
    reviewCount: 942,
    inStock: true,
    summary:
      'Pre-filled stations that workers carry back to the colony. Effective on both sweet and protein feeders.',
    kills: ['Odorous house ants', 'Argentine ants', 'Pavement ants', 'Acrobat ants'],
    useWhere: ['Directly on active trails', 'Under sinks', 'Along baseboards', 'Exterior foundation edge'],
    coverage: '8 stations covers a typical single-family home',
    applicationSteps: [
      'Place stations directly on the active trail, not where you want the ants to go.',
      'Do not clean the trail before placing — the pheromone path is what carries bait home.',
      'Expect activity to increase for 2 to 3 days.',
      'Replace stations when the bait reservoir is empty.',
    ],
    safety: ['Keep out of reach of children and pets.', 'Do not place on food preparation surfaces.'],
    pests: ['ants'],
    ratingBreakdown: [70, 19, 6, 3, 2],
    reviews: [
      { author: 'Ellen K.', rating: 5, date: '2026-06-02', title: 'More ants, then no ants', body: 'The warning about activity increasing first is real and I almost gave up. Day four there was nothing left. Trust the process.', verified: true, pest: 'ants' },
      { author: 'Sam O.', rating: 4, date: '2026-04-19', title: 'Good for sweet feeders', body: 'Cleared the kitchen line fast. Took a second round for the ones in the garage.', verified: true, pest: 'ants' },
    ],
  },
  {
    slug: 'bed-bug-spray',
    name: 'Bed Bug Killer Spray',
    glyph: 'spray',
    price: 42.99,
    unit: '1 gal',
    rating: 4.3,
    reviewCount: 673,
    inStock: true,
    summary:
      'Contact and residual treatment for mattress seams, frames, and baseboards. Dries clear and odorless.',
    kills: ['Bed bugs', 'Bed bug nymphs', 'Dust mites'],
    useWhere: ['Mattress seams', 'Box spring corners', 'Bed frame joints', 'Baseboards and outlet plates'],
    coverage: 'Treats up to 4 rooms',
    applicationSteps: [
      'Strip and hot-wash all bedding before treating.',
      'Spray seams, folds, and joints until damp but not saturated.',
      'Allow to dry completely before remaking the bed.',
      'Repeat treatment at 10 to 14 days to catch newly hatched nymphs.',
    ],
    safety: [
      'Do not apply to skin or pets.',
      'Ventilate the room during and after application.',
      'Allow surfaces to dry fully before contact.',
      'Do not treat a mattress a child sleeps on without reading the full label.',
    ],
    pests: ['bed-bugs'],
    ratingBreakdown: [62, 22, 9, 4, 3],
    reviews: [
      { author: 'Javier M.', rating: 5, date: '2026-07-01', title: 'The second pass is the one that worked', body: 'After one treatment I still had bites. Did the 12-day follow-up exactly as directed and that was the end of it. Do not skip it.', verified: true, pest: 'bed-bugs' },
      { author: 'Renee W.', rating: 4, date: '2026-05-21', title: 'No smell, which mattered', body: 'Sleeping in the room the same night was fine once it dried. Took three weeks total with the follow-up.', verified: true, pest: 'bed-bugs' },
      { author: 'Chris D.', rating: 3, date: '2026-03-08', title: 'Needed more than I bought', body: 'One gallon did not stretch as far as I expected across two bedrooms. Works, buy extra.', verified: true, pest: 'bed-bugs' },
    ],
  },
  {
    slug: 'snap-trap-kit',
    name: 'Snap Trap Kit',
    glyph: 'trap',
    price: 16.99,
    unit: '6 pack',
    rating: 4.6,
    reviewCount: 1105,
    inStock: true,
    summary:
      'Reusable high-tension traps with a covered bait cup. Sets by hand without getting near the bar.',
    kills: ['House mice', 'Deer mice', 'Young rats'],
    useWhere: ['Along walls', 'Behind appliances', 'Attic and crawlspace runways', 'Under sinks'],
    coverage: '6 traps for a typical mouse problem',
    applicationSteps: [
      'Place traps perpendicular to the wall with the trigger end touching it.',
      'Use six traps, not one. Under-trapping is the most common reason this fails.',
      'Bait with a pea-sized amount — a large bait lets them feed without triggering.',
      'Leave traps unset for two nights first if activity is low, then set them.',
    ],
    safety: ['Keep away from children and pets.', 'Wear gloves when handling used traps.', 'Wash hands thoroughly after disposal.'],
    pests: ['mice-and-rats'],
    ratingBreakdown: [74, 17, 5, 2, 2],
    reviews: [
      { author: 'Tom B.', rating: 5, date: '2026-06-25', title: 'Six traps, four mice, one night', body: 'I had been running two traps for a month with nothing. Bought six, placed them against the wall properly, and cleared it immediately. The placement advice is the actual product.', verified: true, pest: 'mice-and-rats' },
      { author: 'Alicia F.', rating: 5, date: '2026-04-11', title: 'Easy to set safely', body: 'I am squeamish about these and the covered cup meant I never had to get near the bar.', verified: true, pest: 'mice-and-rats' },
    ],
  },
  {
    slug: 'mosquito-fogger-concentrate',
    name: 'Mosquito Yard Fogger Concentrate',
    glyph: 'spray',
    price: 29.99,
    unit: '32 oz',
    rating: 4.4,
    reviewCount: 588,
    inStock: true,
    summary:
      'Dilutable concentrate for treating foliage and fence lines where adult mosquitoes rest during the day.',
    kills: ['Mosquitoes', 'Gnats', 'Biting flies'],
    useWhere: ['Underside of shrub foliage', 'Fence lines', 'Shaded ground cover', 'Under decks'],
    coverage: 'Up to 5,000 sq ft per bottle',
    applicationSteps: [
      'Dump every container of standing water before treating — this matters more than the spray.',
      'Dilute per the label and apply to the underside of foliage where adults rest.',
      'Treat in early morning or evening, not midday heat.',
      'Reapply after heavy rain.',
    ],
    safety: [
      'Do not apply to blooming plants where bees are foraging.',
      'Keep people and pets off treated areas until dry.',
      'Do not apply near water bodies or storm drains.',
    ],
    pests: ['mosquitoes'],
    ratingBreakdown: [64, 24, 7, 3, 2],
    reviews: [
      { author: 'Grace L.', rating: 5, date: '2026-07-12', title: 'Got the backyard back', body: 'We could not sit outside after six. Treated the fence line and under the deck and the difference was immediate. Have to redo it after storms.', verified: true, pest: 'mosquitoes' },
      { author: 'Nate P.', rating: 4, date: '2026-06-08', title: 'Works if you also dump water', body: 'Spraying alone did about half the job. Once I found the saucers under the planters it got much better.', verified: true, pest: 'mosquitoes' },
    ],
  },
  {
    slug: 'termite-foam',
    name: 'Termite Foam Barrier',
    glyph: 'spray',
    price: 54.99,
    unit: '18 oz',
    rating: 4.5,
    reviewCount: 312,
    inStock: true,
    summary:
      'Expanding foam that travels into galleries and voids liquid treatment cannot reach.',
    kills: ['Subterranean termites', 'Drywood termites', 'Carpenter ants'],
    useWhere: ['Active mud tubes', 'Wall voids', 'Damaged wood galleries', 'Foundation cracks'],
    coverage: 'Treats approximately 30 linear feet of active tubing',
    applicationSteps: [
      'Confirm you have termites and not flying ants — the wings differ in length.',
      'Inject foam directly into active tubes and gallery openings.',
      'Allow foam to expand and fill the void fully.',
      'Schedule a professional inspection to assess structural damage.',
    ],
    safety: [
      'Wear eye protection during application.',
      'Ventilate enclosed spaces.',
      'Not a substitute for a professional structural assessment.',
    ],
    pests: ['termites'],
    ratingBreakdown: [68, 21, 6, 3, 2],
    reviews: [
      { author: 'Howard S.', rating: 5, date: '2026-05-16', title: 'Stopped the active tubes', body: 'Foam reached back further than the liquid I tried first. Still had a pro come out to check the framing, which the instructions rightly push you to do.', verified: true, pest: 'termites' },
    ],
  },
  {
    slug: 'perimeter-concentrate',
    name: 'Perimeter Defense Concentrate',
    glyph: 'spray',
    price: 46.99,
    unit: '32 oz',
    rating: 4.6,
    reviewCount: 1876,
    inStock: true,
    badge: 'Best seller',
    summary:
      'Broad-spectrum exterior barrier. One bottle treats a typical home perimeter roughly four times.',
    kills: ['Ants', 'Spiders', 'Roaches', 'Crickets', 'Earwigs', 'Silverfish'],
    useWhere: ['Foundation perimeter', 'Door and window frames', 'Eaves and soffits', 'Garage thresholds'],
    coverage: 'Up to 5,000 sq ft per gallon of mixed solution',
    applicationSteps: [
      'Mix per label rate in a pump sprayer.',
      'Treat a 3-foot band up the foundation and 3 feet out onto the ground.',
      'Include door frames, window frames, and utility penetrations.',
      'Reapply every 90 days, or after heavy rain.',
    ],
    safety: [
      'Keep people and pets off treated surfaces until dry.',
      'Do not apply to blooming plants where bees are foraging.',
      'Do not apply directly before rain.',
    ],
    pests: ['ants', 'spiders', 'mosquitoes', 'termites', 'fleas'],
    ratingBreakdown: [72, 19, 5, 2, 2],
    reviews: [
      { author: 'Wendy A.', rating: 5, date: '2026-06-29', title: 'Quarterly routine now', body: 'Started doing the perimeter every three months and the general bug traffic indoors basically stopped. Cheaper than the service I was paying for.', verified: true, pest: 'ants' },
      { author: 'Devin C.', rating: 5, date: '2026-05-05', title: 'Spiders gone from the porch', body: 'Was mainly after spiders. Treating the eaves cleared the webs and they have not come back this season.', verified: true, pest: 'spiders' },
      { author: 'Maria G.', rating: 4, date: '2026-03-30', title: 'Get the sprayer too', body: 'Concentrate is great but you need a decent pump sprayer to apply it evenly. Bought them together the second time.', verified: true, pest: 'ants' },
    ],
  },
  {
    slug: 'insect-growth-regulator',
    name: 'Insect Growth Regulator',
    glyph: 'spray',
    price: 38.99,
    unit: '16 oz',
    rating: 4.4,
    reviewCount: 497,
    inStock: true,
    summary:
      'Stops nymphs from reaching breeding age. Pairs with bait to end the cycle rather than trim the population.',
    kills: ['Roach nymphs', 'Flea larvae', 'Bed bug nymphs'],
    useWhere: ['Cracks and crevices', 'Carpet and upholstery edges', 'Under appliances', 'Pet resting areas'],
    coverage: 'Up to 1,500 sq ft',
    applicationSteps: [
      'Apply alongside bait, never as a replacement for it.',
      'Treat harborage areas and edges rather than open floor.',
      'Allow to dry fully before pets or children re-enter.',
      'One application typically holds for up to 7 months.',
    ],
    safety: ['Keep pets and children off treated areas until dry.', 'Do not apply to food preparation surfaces.'],
    pests: ['cockroaches', 'bed-bugs', 'fleas'],
    ratingBreakdown: [61, 26, 8, 3, 2],
    reviews: [
      { author: 'Kofi A.', rating: 5, date: '2026-04-27', title: 'The piece I was missing', body: 'Bait kept knocking the population down and it kept coming back. Adding this ended it properly.', verified: true, pest: 'cockroaches' },
    ],
  },
  {
    slug: 'pump-sprayer',
    name: '1-Gallon Pump Sprayer',
    glyph: 'spray',
    price: 24.99,
    unit: '1 gal',
    rating: 4.5,
    reviewCount: 823,
    inStock: true,
    summary:
      'Adjustable brass nozzle from cone to stream, with a viton seal that stands up to concentrates.',
    kills: [],
    useWhere: ['Perimeter applications', 'Foliage treatment', 'Spot treatment indoors'],
    coverage: 'Holds 1 gallon of mixed solution',
    applicationSteps: [
      'Mix concentrate per the product label, never by eye.',
      'Pump to pressure and adjust the nozzle to a fan for perimeter bands.',
      'Rinse thoroughly after every use to protect the seals.',
      'Label the sprayer and do not reuse it for herbicide.',
    ],
    safety: ['Release pressure before opening.', 'Never mix products not labeled for combination.'],
    pests: ['ants', 'mosquitoes', 'spiders'],
    ratingBreakdown: [69, 21, 6, 2, 2],
    reviews: [
      { author: 'Bill R.', rating: 5, date: '2026-05-11', title: 'Seals held up', body: 'Third sprayer I have owned and the first where the seal did not go soft after a season of concentrate.', verified: true },
    ],
  },
  {
    slug: 'glue-board-monitors',
    name: 'Glue Board Monitors',
    glyph: 'trap',
    price: 12.99,
    unit: '12 pack',
    rating: 4.2,
    reviewCount: 415,
    inStock: true,
    summary:
      'Low-profile monitors that tell you where activity actually is before you spend money treating.',
    kills: ['Roaches', 'Spiders', 'Silverfish', 'Scorpions'],
    useWhere: ['Under sinks', 'Behind appliances', 'Along walls', 'Closet corners'],
    coverage: '12 monitors covers a typical home',
    applicationSteps: [
      'Place flat against walls in suspected activity areas.',
      'Number and date each board so you can compare over time.',
      'Check at 48 hours to identify the hot zones.',
      'Treat where the catch is highest, not where you assumed.',
    ],
    safety: ['Keep away from pets.', 'Not intended for use on vertebrates.'],
    pests: ['cockroaches', 'bed-bugs', 'mice-and-rats', 'spiders'],
    ratingBreakdown: [55, 28, 10, 4, 3],
    reviews: [
      { author: 'Sofia H.', rating: 4, date: '2026-04-03', title: 'Told me where to actually treat', body: 'Assumed the problem was the kitchen. Boards said laundry room. Treated there and it was over quickly.', verified: true, pest: 'cockroaches' },
    ],
  },
  {
    slug: 'flea-carpet-powder',
    name: 'Flea and Tick Carpet Powder',
    glyph: 'granule',
    price: 18.99,
    unit: '16 oz',
    rating: 4.3,
    reviewCount: 536,
    inStock: true,
    summary:
      'Worked into carpet fiber to reach the eggs and larvae that surface treatment misses.',
    kills: ['Fleas', 'Flea eggs', 'Flea larvae', 'Ticks'],
    useWhere: ['Carpet and rugs', 'Pet bedding areas', 'Upholstery seams', 'Baseboards'],
    coverage: 'Up to 800 sq ft',
    applicationSteps: [
      'Treat the pet first with a veterinary product — this step is not optional.',
      'Vacuum thoroughly, then discard the bag outside.',
      'Sprinkle evenly and work into the fiber with a broom.',
      'Leave 30 minutes, vacuum again, and repeat in two weeks.',
    ],
    safety: ['Keep pets off during application and until vacuumed.', 'Ventilate while applying.', 'Not for direct use on animals.'],
    pests: ['fleas'],
    ratingBreakdown: [58, 26, 10, 4, 2],
    reviews: [
      { author: 'Leah M.', rating: 5, date: '2026-06-18', title: 'Two rounds did it', body: 'Treated the dog the same morning as the carpet like it says. Round two at two weeks caught the stragglers.', verified: true, pest: 'fleas' },
    ],
  },
  {
    slug: 'diatomaceous-earth-kit',
    name: 'Diatomaceous Earth Duster Kit',
    glyph: 'granule',
    price: 22.99,
    unit: '4 lb + duster',
    rating: 4.1,
    reviewCount: 389,
    inStock: false,
    summary:
      'Mechanical control with no chemical residue. Slow, but it keeps working as long as it stays dry.',
    kills: ['Roaches', 'Ants', 'Silverfish', 'Bed bugs', 'Fleas'],
    useWhere: ['Wall voids', 'Under appliances', 'Attic and crawlspace', 'Behind outlet plates'],
    coverage: 'Up to 2,000 sq ft',
    applicationSteps: [
      'Apply a thin film — a visible pile is one insects walk around.',
      'Target voids and cracks rather than open surfaces.',
      'Keep dry. It stops working entirely once damp.',
      'Reapply after any moisture exposure.',
    ],
    safety: ['Wear a dust mask during application.', 'Avoid creating airborne dust in occupied rooms.'],
    pests: ['cockroaches', 'ants', 'bed-bugs', 'fleas'],
    ratingBreakdown: [48, 30, 13, 6, 3],
    reviews: [
      { author: 'Ray V.', rating: 4, date: '2026-02-22', title: 'Slow but no chemicals', body: 'Wanted something I was comfortable using with a toddler crawling around. Takes weeks, not days, but it worked in the wall voids.', verified: true, pest: 'cockroaches' },
    ],
  },
];

/* Lookups -------------------------------------------------------------- */

export const getProduct = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getPest = (slug: string): Pest | undefined =>
  pests.find((p) => p.slug === slug);

export const productsForPest = (pestSlug: string): Product[] => {
  const pest = getPest(pestSlug);
  if (!pest) return [];
  const ranked = pest.recommended
    .map((slug) => getProduct(slug))
    .filter((p): p is Product => Boolean(p));
  const rest = products.filter(
    (p) => p.pests.includes(pestSlug) && !pest.recommended.includes(p.slug),
  );
  return [...ranked, ...rest];
};

export const relatedProducts = (product: Product, limit = 4): Product[] =>
  products
    .filter((p) => p.slug !== product.slug && p.pests.some((s) => product.pests.includes(s)))
    .slice(0, limit);

export const bestSellers = (limit = 4): Product[] =>
  [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, limit);

export const formatPrice = (value: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
