export type Property = {
  id: string; // e.g. "AR-PROP-001"
  slug: string; // url-safe
  title: string;
  address: string;
  area: string; // e.g. "Didsbury, Manchester"
  region: "England" | "Scotland" | "Wales";
  property_type: string; // e.g. "Semi-detached house"
  bedrooms: number;
  bathrooms: number;
  receptions?: number;
  price_gbp: number;
  price_frequency: "one-off" | "pcm";
  status: "For sale" | "To let" | "Let agreed" | "Sold STC" | "Under offer";
  tenure?: "Freehold" | "Leasehold" | "Share of freehold";
  epc_rating?: string; // "A"–"G"
  key_features: string[];
  description: string; // 2–4 paragraphs
  images: string[]; // paths under /public/images/properties/<id>/ or web paths
  floorplan?: string;
  brochure_pdf?: string;
  documents?: { label: string; url: string }[]; // EPC, brochure, floorplan
  latitude?: number;
  longitude?: number;
  featured?: boolean;
  listed_at: string; // ISO
};

export const properties: Property[] = [
  {
    id: "AR-PROP-001",
    slug: "three-bedroom-semi-detached-house-didsbury-manchester",
    title: "Three-bedroom semi-detached house",
    address: "24 Example Road, Didsbury, Manchester, M20 4AA",
    area: "Didsbury, Manchester",
    region: "England",
    property_type: "Semi-detached house",
    bedrooms: 3,
    bathrooms: 2,
    receptions: 2,
    price_gbp: 395000,
    price_frequency: "one-off",
    status: "For sale",
    tenure: "Freehold",
    epc_rating: "C",
    key_features: [
      "Substantial private rear lawn and patio",
      "Paved private driveway for multiple vehicles",
      "Bespoke fitted kitchen with integrated appliances",
      "Double glazing throughout with restored sash bays",
      "Catchment area for premier local primary and grammar schools",
      "115 sq m internal living accommodation"
    ],
    description: `A handsome Edwardian semi-detached residence positioned along one of Didsbury's most sought-after tree-lined avenues. Presented in immaculate condition, the property balances rich period detailing with sympathetic contemporary enhancements, creating a sophisticated family home within walking distance of Didsbury Village.

The ground floor comprises a deep reception hallway, an elegant front-facing sitting room featuring an original marble surround and deep bay window, and an expansive rear living and dining space. The adjoining kitchen is fitted with solid quartz worktops, shaker cabinetry, and French doors leading directly onto the paved stone terrace.

To the first floor are three generous bedrooms, including a principal bedroom with custom wardrobes, and a four-piece family bathroom suite complete with a freestanding roll-top bath and separate rainfall shower. The private rear garden is predominantly laid to lawn with mature herbaceous borders, providing an idyllic private sanctuary.`,
    images: [
      "/images/properties/AR-PROP-001/hero.jpg",
      "/images/properties/AR-PROP-001/hero.jpg"
    ],
    floorplan: "/documents/property-listings-brochure.pdf",
    brochure_pdf: "/documents/property-listings-brochure.pdf",
    documents: [
      { label: "Official Brochure PDF", url: "/documents/property-listings-brochure.pdf" },
      { label: "Energy Performance Certificate (EPC C)", url: "/documents/property-listings-brochure.pdf" },
      { label: "Floorplan & Boundary Plan", url: "/documents/property-listings-brochure.pdf" }
    ],
    latitude: 53.4168,
    longitude: -2.2307,
    featured: true,
    listed_at: "2026-10-15T09:00:00Z"
  },
  {
    id: "AR-PROP-002",
    slug: "two-bedroom-modern-apartment-salford-quays",
    title: "Two-bedroom modern apartment",
    address: "8 Example Quay, Salford Quays, Salford, M50 3AB",
    area: "Salford Quays, Manchester",
    region: "England",
    property_type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    receptions: 1,
    price_gbp: 1550,
    price_frequency: "pcm",
    status: "To let",
    tenure: "Leasehold",
    epc_rating: "B",
    key_features: [
      "Private sheltered balcony with panoramic waterfront views",
      "Secure allocated underground parking space included",
      "Twenty-four hour concierge and resident lounge",
      "Private on-site residents gymnasium and wellness suite",
      "Metrolink tram stop within two minutes walk",
      "78 sq m contemporary open-plan layout"
    ],
    description: `Occupying a premier waterfront position within Salford Quays, this high-specification two-bedroom apartment offers effortless contemporary living with uninterrupted views over the docks and MediaCityUK.

The apartment features an expansive open-plan reception room with full-height floor-to-ceiling glazing opening directly onto a private sheltered balcony. The kitchen is appointed with streamlined handleless cabinetry, premium Siemens integrated appliances, and a polished composite breakfast bar.

Both bedrooms are well-proportioned doubles, with the principal suite benefiting from built-in fitted wardrobes and an ensuite shower room finished in Italian porcelain tile. Residents enjoy exclusive access to 24-hour concierge services, a state-of-the-art gym, secure cycle storage, and designated parking.`,
    images: [
      "/images/properties/AR-PROP-002/hero.jpg",
      "/images/properties/AR-PROP-002/hero.jpg"
    ],
    floorplan: "/documents/property-listings-brochure.pdf",
    brochure_pdf: "/documents/property-listings-brochure.pdf",
    documents: [
      { label: "Lettings Brochure & Inventory", url: "/documents/property-listings-brochure.pdf" },
      { label: "EPC Certificate (Rating B)", url: "/documents/property-listings-brochure.pdf" }
    ],
    latitude: 53.4722,
    longitude: -2.2858,
    featured: true,
    listed_at: "2026-10-22T11:30:00Z"
  },
  {
    id: "AR-PROP-003",
    slug: "four-bedroom-detached-family-home-altrincham",
    title: "Four-bedroom detached family home",
    address: "12 Example Lane, Altrincham, Greater Manchester, WA14 2XY",
    area: "Altrincham, Greater Manchester",
    region: "England",
    property_type: "Detached house",
    bedrooms: 4,
    bathrooms: 3,
    receptions: 3,
    price_gbp: 625000,
    price_frequency: "one-off",
    status: "Under offer",
    tenure: "Freehold",
    epc_rating: "B",
    key_features: [
      "Double garage with electric automated doors",
      "Extensive landscaped south-facing rear lawn",
      "Master ensuite bedroom with dressing room",
      "Dedicated ground floor utility room and boot room",
      "Expansive open-plan kitchen and family room with bi-fold doors",
      "185 sq m exceptional family accommodation"
    ],
    description: `An executive four-bedroom detached family home commanding a generous private plot within one of Altrincham's most revered residential enclaves. Designed to the highest architectural standards, this residence effortlessly combines family practicality with refined luxury.

At the core of the home is an impressive open-plan family living kitchen fitted with handcrafted cabinetry, central island, double wine coolers, and bi-fold doors opening seamlessly onto the level stone terrace. Two further reception rooms provide a quiet formal sitting room and an executive home office.

Upstairs, the grand gallery landing leads to four double bedrooms. The master suite features vaulted ceilings, fitted dressing wardrobes, and a lavish ensuite wet room. Two further bathrooms serve the remaining bedrooms. Externally, manicured lawns surround the house alongside double garage parking for four cars.`,
    images: [
      "/images/properties/AR-PROP-003/hero.jpg",
      "/images/properties/AR-PROP-003/hero.jpg"
    ],
    floorplan: "/documents/property-listings-brochure.pdf",
    brochure_pdf: "/documents/property-listings-brochure.pdf",
    documents: [
      { label: "Sales Prospectus & Floorplan", url: "/documents/property-listings-brochure.pdf" },
      { label: "EPC Report (Rating B)", url: "/documents/property-listings-brochure.pdf" }
    ],
    latitude: 53.3872,
    longitude: -2.3537,
    featured: true,
    listed_at: "2026-10-08T14:15:00Z"
  },
  {
    id: "AR-PROP-004",
    slug: "one-bedroom-city-centre-apartment-manchester",
    title: "One-bedroom city-centre apartment",
    address: "5 Example Street, Manchester City Centre, Manchester, M1 2AB",
    area: "City Centre, Manchester",
    region: "England",
    property_type: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    receptions: 1,
    price_gbp: 1200,
    price_frequency: "pcm",
    status: "To let",
    tenure: "Leasehold",
    epc_rating: "C",
    key_features: [
      "Fully furnished to high interior design specifications",
      "Dual lift access with secure video fob entry",
      "Centrally situated near Piccadilly Station",
      "Superfast fibre broadband wired throughout",
      "Open-plan living room with Juliet balcony",
      "52 sq m optimal urban footprint"
    ],
    description: `A stylish and light-filled one-bedroom city apartment positioned in the very heart of Manchester, moments from Piccadilly Station and the Northern Quarter. 

Offered on a fully furnished basis with bespoke contemporary furnishings, this apartment comprises a welcoming entrance hallway, open-plan reception room with timber flooring, sleek fitted kitchen, and a peaceful double bedroom with integrated wardrobe storage. 

An ideal urban residence for professionals seeking effortless access to the central business district, transport hubs, and premier dining destinations.`,
    images: [
      "/images/properties/AR-PROP-002/hero.jpg"
    ],
    floorplan: "/documents/property-listings-brochure.pdf",
    brochure_pdf: "/documents/property-listings-brochure.pdf",
    documents: [
      { label: "Property Particulars", url: "/documents/property-listings-brochure.pdf" }
    ],
    latitude: 53.4808,
    longitude: -2.2374,
    featured: false,
    listed_at: "2026-10-25T10:00:00Z"
  },
  {
    id: "AR-PROP-014",
    slug: "two-bedroom-bungalow-clifton-bristol",
    title: "Two-bedroom bungalow",
    address: "19 Example Close, Clifton, Bristol, BS8 1XX",
    area: "Clifton, Bristol",
    region: "England",
    property_type: "Bungalow",
    bedrooms: 2,
    bathrooms: 1,
    receptions: 1,
    price_gbp: 335000,
    price_frequency: "one-off",
    status: "Under offer",
    tenure: "Freehold",
    epc_rating: "D",
    key_features: [
      "Desirable single-storey layout in Clifton village vicinity",
      "Sunny enclosed mature lawned garden",
      "Private off-street driveway parking",
      "Bright double-aspect living and dining room",
      "Level access throughout suitable for all ages",
      "94 sq m internal floor area"
    ],
    description: `A rare opportunity to acquire an attractive two-bedroom detached bungalow nestled in a quiet cul-de-sac within Clifton, Bristol. Single-storey residences in this historic quarter are seldom available.

The layout comprises a bright dual-aspect sitting room overlooking the landscaped gardens, a well-appointed kitchen with dining nook, two double bedrooms, and a modern shower room. Outside, the property enjoys private driveway parking and a tranquil garden with perennial borders.`,
    images: [
      "/images/properties/AR-PROP-001/hero.jpg"
    ],
    floorplan: "/documents/property-listings-brochure.pdf",
    brochure_pdf: "/documents/property-listings-brochure.pdf",
    documents: [
      { label: "Sales Brochure", url: "/documents/property-listings-brochure.pdf" }
    ],
    latitude: 51.4552,
    longitude: -2.6225,
    featured: false,
    listed_at: "2026-10-18T16:00:00Z"
  },
  {
    id: "AR-PROP-015",
    slug: "two-bedroom-apartment-oldfield-park-bath",
    title: "Two-bedroom apartment",
    address: "26 Sample Avenue, Oldfield Park, Bath, BA2 3XX",
    area: "Oldfield Park, Bath",
    region: "England",
    property_type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    receptions: 1,
    price_gbp: 1575,
    price_frequency: "pcm",
    status: "To let",
    tenure: "Leasehold",
    epc_rating: "B",
    key_features: [
      "Private balcony with southern aspect",
      "Secure keycard entry and elevator access",
      "Two minutes walk to Oldfield Park railway station",
      "Ensuite bathroom to master bedroom",
      "Underfloor heating throughout",
      "68 sq m modern living space"
    ],
    description: `An impeccably presented two-bedroom apartment situated within an exclusive modern development in Oldfield Park, Bath. Benefiting from rapid rail links to Bath Spa and Bristol Temple Meads.

The accommodation features an open-plan kitchen and reception room finished with granite worktops and integrated appliances, opening to a private sunny balcony. Both bedrooms are generous doubles, complemented by two contemporary bathrooms.`,
    images: [
      "/images/properties/AR-PROP-002/hero.jpg"
    ],
    floorplan: "/documents/property-listings-brochure.pdf",
    brochure_pdf: "/documents/property-listings-brochure.pdf",
    documents: [
      { label: "Particulars & Tenancy Terms", url: "/documents/property-listings-brochure.pdf" }
    ],
    latitude: 51.3789,
    longitude: -2.3785,
    featured: false,
    listed_at: "2026-10-28T09:30:00Z"
  },
  {
    id: "AR-PROP-031",
    slug: "five-bedroom-executive-home-chapel-allerton-leeds",
    title: "Five-bedroom executive home",
    address: "49 Demonstration Road, Chapel Allerton, Leeds, LS7 3XX",
    area: "Chapel Allerton, Leeds",
    region: "England",
    property_type: "Detached house",
    bedrooms: 5,
    bathrooms: 4,
    receptions: 3,
    price_gbp: 670000,
    price_frequency: "one-off",
    status: "For sale",
    tenure: "Freehold",
    epc_rating: "B",
    key_features: [
      "Substantial double garage with driveway for four cars",
      "Professionally landscaped private rear garden",
      "Dedicated executive home office and study",
      "Spectacular kitchen, breakfast room and family snug",
      "Two master suites with bespoke ensuite facilities",
      "233 sq m internal floor area"
    ],
    description: `A commanding five-bedroom detached residence set within the vibrant cultural hub of Chapel Allerton, Leeds. Offering over 2,500 square feet of impeccably crafted living space across two expansive storeys.

Designed for modern family living and entertaining, the property features three versatile reception spaces including a magnificent family kitchen with quartz island, wine refrigeration, and expansive glass doors onto the private grounds.

Upstairs boasts five double bedrooms and four luxury bathrooms, including two self-contained master suites. Chapel Allerton's boutique bakeries, cafes, and outstanding schools are all within easy strolling distance.`,
    images: [
      "/images/properties/AR-PROP-003/hero.jpg"
    ],
    floorplan: "/documents/property-listings-brochure.pdf",
    brochure_pdf: "/documents/property-listings-brochure.pdf",
    documents: [
      { label: "Full Sales Brochure", url: "/documents/property-listings-brochure.pdf" },
      { label: "EPC Rating B Report", url: "/documents/property-listings-brochure.pdf" }
    ],
    latitude: 53.8291,
    longitude: -1.5367,
    featured: false,
    listed_at: "2026-10-12T12:00:00Z"
  },
  {
    id: "AR-PROP-042",
    slug: "two-bedroom-cottage-morningside-edinburgh",
    title: "Two-bedroom cottage",
    address: "37 Illustration Street, Morningside, Edinburgh, EH10 5XX",
    area: "Morningside, Edinburgh",
    region: "Scotland",
    property_type: "Cottage",
    bedrooms: 2,
    bathrooms: 1,
    receptions: 1,
    price_gbp: 290000,
    price_frequency: "one-off",
    status: "Under offer",
    tenure: "Freehold",
    epc_rating: "D",
    key_features: [
      "Classic Edinburgh honey sandstone facade",
      "Charming walled courtyard garden with stone flagstones",
      "Tastefully renovated shaker kitchen with timber worktops",
      "Traditional sash and case windows and cast iron fireplace",
      "Sought-after Morningside location with excellent amenities",
      "82 sq m Scottish period charm"
    ],
    description: `A quintessential Scottish stone cottage in the heart of Morningside, one of Edinburgh's most esteemed residential areas. Dating back to the late Victorian era, this delightful home combines historic architectural character with refined modern comfort.

The ground floor features an inviting sitting room centered around a working cast-iron fireplace, leading through to a bespoke breakfast kitchen with views over the private walled courtyard. 

The upper floor accommodates two peaceful bedrooms with leafy views and a traditional bathroom with tongue-and-groove panelling and heritage brassware.`,
    images: [
      "/images/properties/AR-PROP-042/hero.jpg",
      "/images/properties/AR-PROP-042/hero.jpg"
    ],
    floorplan: "/documents/property-listings-brochure.pdf",
    brochure_pdf: "/documents/property-listings-brochure.pdf",
    documents: [
      { label: "Home Report & Energy Report", url: "/documents/property-listings-brochure.pdf" },
      { label: "Property Schedule PDF", url: "/documents/property-listings-brochure.pdf" }
    ],
    latitude: 55.9272,
    longitude: -3.2098,
    featured: false,
    listed_at: "2026-10-19T08:45:00Z"
  },
  {
    id: "AR-PROP-043",
    slug: "three-bedroom-townhouse-west-end-glasgow",
    title: "Three-bedroom townhouse",
    address: "44 Fictional Crescent, West End, Glasgow, G12 8XX",
    area: "West End, Glasgow",
    region: "Scotland",
    property_type: "Townhouse",
    bedrooms: 3,
    bathrooms: 2,
    receptions: 2,
    price_gbp: 1575,
    price_frequency: "pcm",
    status: "To let",
    tenure: "Freehold",
    epc_rating: "C",
    key_features: [
      "Allocated private resident parking bay",
      "Modern integrated breakfast kitchen with stone counters",
      "Private sheltered patio garden",
      "Two reception rooms across split-level arrangement",
      "Close proximity to University of Glasgow and Botanic Gardens",
      "127 sq m spacious townhouse living"
    ],
    description: `A substantial three-bedroom contemporary townhouse situated in Glasgow's prestigious West End. Offering exceptional accommodation across three levels with private parking and outdoor patio.

The property features a reception hallway, formal sitting room, separate dining kitchen with integrated appliances, master bedroom with ensuite shower, two further bedrooms, and a main family bathroom. Ideally located close to Byres Road amenities and subway links.`,
    images: [
      "/images/properties/AR-PROP-001/hero.jpg"
    ],
    floorplan: "/documents/property-listings-brochure.pdf",
    brochure_pdf: "/documents/property-listings-brochure.pdf",
    documents: [
      { label: "Lettings Particulars", url: "/documents/property-listings-brochure.pdf" }
    ],
    latitude: 55.8741,
    longitude: -4.2987,
    featured: false,
    listed_at: "2026-10-24T15:20:00Z"
  },
  {
    id: "AR-PROP-046",
    slug: "three-bedroom-family-home-pontcanna-cardiff",
    title: "Three-bedroom family home",
    address: "65 Demonstration Road, Pontcanna, Cardiff, CF11 9XX",
    area: "Pontcanna, Cardiff",
    region: "Wales",
    property_type: "Semi-detached house",
    bedrooms: 3,
    bathrooms: 2,
    receptions: 2,
    price_gbp: 300000,
    price_frequency: "one-off",
    status: "For sale",
    tenure: "Freehold",
    epc_rating: "C",
    key_features: [
      "Delightful enclosed rear garden with sun terrace",
      "Private paved off-road driveway",
      "Contemporary fitted kitchen and dining room",
      "Walking distance to Pontcanna Fields and Bute Park",
      "Excellent local Welsh and English medium schools",
      "111 sq m character family residence"
    ],
    description: `A handsome three-bedroom semi-detached family residence situated in one of Cardiff's most desirable tree-lined neighbourhoods, Pontcanna.

Retaining original period features alongside modern upgrades, the house comprises two generous reception rooms, a newly fitted kitchen opening out to the garden, three bedrooms, and a family bathroom. Steps away from Pontcanna's independent artisan shops and parklands.`,
    images: [
      "/images/properties/AR-PROP-001/hero.jpg"
    ],
    floorplan: "/documents/property-listings-brochure.pdf",
    brochure_pdf: "/documents/property-listings-brochure.pdf",
    documents: [
      { label: "Sales Brochure & EPC", url: "/documents/property-listings-brochure.pdf" }
    ],
    latitude: 51.4883,
    longitude: -3.1973,
    featured: false,
    listed_at: "2026-10-14T11:00:00Z"
  },
  {
    id: "AR-PROP-047",
    slug: "four-bedroom-detached-home-uplands-swansea",
    title: "Four-bedroom detached home",
    address: "72 Illustration Street, Uplands, Swansea, SA2 0XX",
    area: "Uplands, Swansea",
    region: "Wales",
    property_type: "Detached house",
    bedrooms: 4,
    bathrooms: 3,
    receptions: 2,
    price_gbp: 445000,
    price_frequency: "one-off",
    status: "For sale",
    tenure: "Freehold",
    epc_rating: "C",
    key_features: [
      "Private lawned garden with elevated coastal outlook",
      "Integral garage and private multi-car driveway",
      "Principal ensuite bedroom and family bathroom",
      "Expansive contemporary family kitchen with dining area",
      "Close to Swansea Bay seafront and Gower peninsula access",
      "178 sq m spacious detached layout"
    ],
    description: `An executive four-bedroom detached family home commanding a prominent elevated position in Uplands, Swansea, enjoying sweeping views towards Swansea Bay.

The property features a reception hallway, dual-aspect lounge, modern open-plan kitchen and dining area, master bedroom with ensuite, three further double bedrooms, and family bathroom. Mature gardens to front and rear provide outstanding privacy.`,
    images: [
      "/images/properties/AR-PROP-003/hero.jpg"
    ],
    floorplan: "/documents/property-listings-brochure.pdf",
    brochure_pdf: "/documents/property-listings-brochure.pdf",
    documents: [
      { label: "Sales Particulars", url: "/documents/property-listings-brochure.pdf" }
    ],
    latitude: 51.6192,
    longitude: -3.9664,
    featured: false,
    listed_at: "2026-10-17T13:40:00Z"
  },
  {
    id: "AR-PROP-048",
    slug: "one-bedroom-furnished-flat-caerleon-newport",
    title: "One-bedroom furnished flat",
    address: "79 Fictional Crescent, Caerleon, Newport, NP18 1XX",
    area: "Caerleon, Newport",
    region: "Wales",
    property_type: "Flat",
    bedrooms: 1,
    bathrooms: 1,
    receptions: 1,
    price_gbp: 925,
    price_frequency: "pcm",
    status: "To let",
    tenure: "Leasehold",
    epc_rating: "C",
    key_features: [
      "Offered fully furnished with quality contemporary pieces",
      "Secure intercom entry system",
      "Close to village amenities and historic Roman amphitheatre",
      "Direct transport links to Newport and Cardiff",
      "Allocated off-road parking space",
      "48 sq m practical single-level living"
    ],
    description: `A charming one-bedroom furnished apartment situated in the picturesque historic Roman village of Caerleon. 

Featuring a bright open-plan lounge and fitted kitchen, double bedroom with storage, and a three-piece bathroom suite. Allocated parking space included. Excellent commuting proximity to Newport and the M4 motorway corridor.`,
    images: [
      "/images/properties/AR-PROP-002/hero.jpg"
    ],
    floorplan: "/documents/property-listings-brochure.pdf",
    brochure_pdf: "/documents/property-listings-brochure.pdf",
    documents: [
      { label: "Lettings Schedule", url: "/documents/property-listings-brochure.pdf" }
    ],
    latitude: 51.6125,
    longitude: -2.9555,
    featured: false,
    listed_at: "2026-10-26T14:10:00Z"
  }
];

// Helper functions for property queries
export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug || p.id.toLowerCase() === slug.toLowerCase());
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id.toLowerCase() === id.toLowerCase());
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured);
}
