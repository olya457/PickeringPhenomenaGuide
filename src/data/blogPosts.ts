export interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  locationId: number;
  image: any;
  content: string;
  tags: string[];
  isLiked: boolean;
  isBookmarked: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Chasing the Aurora: My Night at Aurora Point',
    author: 'Sarah Mitchell',
    date: 'February 15, 2026',
    readTime: '5 min read',
    excerpt: 'After months of planning, I finally witnessed the Northern Lights dance across the Pickering sky.',
    locationId: 1,
    image: require('../assets/images/AuroraPoint.png'),
    content: `The forecast said "maybe." The aurora alert app pinged at 9:47 PM. I grabbed my warmest coat and drove to Aurora Point.

When I arrived at 10:15 PM, about a dozen other aurora chasers had already set up. The temperature was -18°C, but anticipation kept us warm.

At 10:42 PM, it began. A faint green glow appeared on the northern horizon. Within minutes, it intensified, spreading across the sky like luminous curtains. Then came the purple — streaks of violet dancing through the green.

The aurora danced for nearly three hours. At its peak around midnight, the entire northern sky was alive with movement. The reflection on Lake Ontario doubled the spectacle.

Tips for Your Visit:
- Download an aurora alert app
- Dress in extreme cold gear
- Bring a red flashlight to preserve night vision
- Allow 20 minutes for eyes to adjust to darkness`,
    tags: ['Aurora', 'Night Photography', 'Winter', 'Stargazing'],
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 2,
    title: 'The Hidden World of Phantom Forest',
    author: 'Marcus Chen',
    date: 'October 3, 2025',
    readTime: '7 min read',
    excerpt: 'I set my alarm for 4:30 AM to photograph the morning mist. What I discovered was far more magical than I expected.',
    locationId: 3,
    image: require('../assets/images/ThunderValley.png'),
    content: `The alarm went off at 4:30 AM. I arrived at Phantom Forest at 5:15 AM in complete darkness.

By 5:45 AM, sunrise was beginning, and the fog started to appear. Not all at once — it materialized slowly, like the forest was exhaling. Tendrils of mist wound between the massive tree trunks.

At 6:20 AM, I heard rustling. A white-tailed deer emerged from the fog not 15 meters away. For five minutes, I watched her browse, backlit by the rising sun, fog swirling around her. It felt sacred.

Practical Advice:
- Arrive 30 minutes before sunrise
- Bring tripod and wide-angle lens
- Wear waterproof boots
- Multiple layers — starts cold, warms quickly
- Stay quiet — wildlife is active at dawn`,
    tags: ['Photography', 'Fall Colors', 'Wildlife', 'Hiking'],
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 3,
    title: 'Inside the Crystal Caverns: A Winter Underground Adventure',
    author: 'Emma Rodriguez',
    date: 'January 28, 2026',
    readTime: '6 min read',
    excerpt: 'I conquered my fear of enclosed spaces to explore one of Ontario\'s most unique winter phenomena.',
    locationId: 4,
    image: require('../assets/images/CrystalCaverns.png'),
    content: `Let me be honest: I\'m claustrophobic. But when my friend Katie convinced me that Crystal Caverns was a must-see, I decided to face my fear.

The tour group met at 10 AM. There were eight of us plus two guides. Then we descended into the Ice Chamber.

Blue. Everything was blue. Ice stalactites hung from the ceiling like frozen chandeliers. Our headlamps made them glow from within.

What You Need to Know:
- Book ahead — tours fill up on weekends
- Cost: $45/person
- Duration: 2.5 hours including prep
- Minimum age: 12 years
- Bring: Warm waterproof clothing, gloves, sturdy boots`,
    tags: ['Adventure', 'Winter', 'Underground', 'Geology'],
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 4,
    title: 'Why Rainbow Meadows Should Be On Your Bucket List',
    author: 'Jake Thompson',
    date: 'July 12, 2025',
    readTime: '4 min read',
    excerpt: 'Five visits later, I finally saw the elusive double rainbow. Here\'s what I learned about timing your visit.',
    locationId: 7,
    image: require('../assets/images/RainbowMeadows.png'),
    content: `Rainbow Meadows has a reputation: if you time it right, you\'ll see double rainbows. I tried four times before I finally succeeded.

The Secret Formula:
1. Afternoon storms (2-6 PM) are best
2. You need rain to your east, sun breaking through in the west
3. Arrive 15-20 minutes before storm ends
4. Position yourself facing east
5. Best months: June-August

The meadow\'s open terrain means unobstructed 360° views. When a rainbow forms, you see the entire arc. The wildflowers add a spectacular foreground.

Even my "failed" attempts gave me beautiful single rainbows and peaceful time in a gorgeous meadow.`,
    tags: ['Weather', 'Photography', 'Summer', 'Wildflowers'],
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 5,
    title: 'Starfall Ridge: A Beginner\'s Stargazing Success Story',
    author: 'Priya Patel',
    date: 'August 15, 2025',
    readTime: '5 min read',
    excerpt: 'I\'d never seen the Milky Way before. My first trip to Starfall Ridge changed that forever.',
    locationId: 9,
    image: require('../assets/images/StarfallRidge.png'),
    content: `I\'d lived in cities my entire life. The night sky meant seeing maybe a dozen stars if you were lucky.

We arrived at the trailhead at 8:30 PM on August 12th — the peak night of the Perseid meteor shower. The 30-minute uphill hike in darkness was intimidating, but red headlamps helped.

Then, as my eyes adjusted, the Milky Way appeared. Gradually, it started as a faint cloudy band across the sky, then details emerged: dark patches, bright patches, countless individual stars.

What I Wish I\'d Known:
- Timing Matters: Go during a new moon
- Dress Warmer Than You Think
- Bring hot chocolate in a thermos
- Red Light Only — white lights ruin night vision
- No Flash Photography`,
    tags: ['Stargazing', 'Meteor Shower', 'Night Sky', 'Beginner Friendly'],
    isLiked: false,
    isBookmarked: false,
  },
];

export function getBlogPostById(id: number): BlogPost | undefined {
  return blogPosts.find(post => post.id === id);
}

export function getBlogPostsByLocation(locationId: number): BlogPost[] {
  return blogPosts.filter(post => post.locationId === locationId);
}