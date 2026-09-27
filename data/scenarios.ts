export interface Metrics {
  vision: number;
  courage: number;
  risk: number;
  control: number;
  empathy: number;
  ethics: number;
}

export interface DecisionDna {
  archetypeTitle: string;
  archetypeDescription: string;
  portrait: string;
  metrics: Metrics;
  patternNote: string;
  blindSpot: string;
}

export interface ScenarioOption {
  id: string;
  title: string;
  description: string;
  decisionDna: DecisionDna;
}

export interface Scenario {
  id: number;
  title: string;
  description: string;
  time: string;
  image: string;
  options: ScenarioOption[];
}

export const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Iraq War",
    description:
      "2003. The chemical weapon allegations are on your desk. Your decision will determine the fate of millions.",
    time: "1:37 min",
    image: "assets/images/scenarios/iraq_war.jpeg",
    options: [
      {
        id: "opt_1_1",
        title: "Coalition-Led Preemptive Invasion",
        description:
          "Execute a rapid military campaign to topple the regime without waiting for further UN authorization.",
        decisionDna: {
          archetypeTitle: "Aggressive Hegemon",
          portrait: "assets/images/dna-portraits/bodozlama-dalasan.png",
          archetypeDescription:
            "You eliminate threats before they can gather strength. Speed and decisive force matter more to you than consensus.",
          metrics: { vision: 75, courage: 88, risk: 92, control: 40, empathy: 25, ethics: 28 },
          patternNote:
            "You prioritize the immediate physical elimination of threats over international consensus and diplomatic legitimacy. In high-stakes moments, you choose decisive force over waiting for external approval.",
          blindSpot: "Underestimates asymmetric post-invasion fallout and humanitarian cost.",
        },
      },
      {
        id: "opt_1_2",
        title: "Extended UN Weapons Inspections",
        description:
          "Grant UNMOVIC teams additional operational leeway and time under strict aerial and border surveillance.",
        decisionDna: {
          archetypeTitle: "Procedural Diplomat",
          portrait: "assets/images/dna-portraits/uyumcu.png",
          archetypeDescription:
            "You trust process over urgency. Verification first, action second — legitimacy is the only source of power you fully rely on.",
          metrics: { vision: 65, courage: 42, risk: 30, control: 78, empathy: 82, ethics: 90 },
          patternNote:
            "You place institutional legitimacy and rules-based processes above urgent kinetic actions. Your primary instinct is to avoid catastrophic escalation through thorough verification.",
          blindSpot: "Susceptible to strategic deception and prolonged adversary stalling tactics.",
        },
      },
      {
        id: "opt_1_3",
        title: "Strategic Airstrikes and Expanded No-Fly Zones",
        description:
          "Enforce intensified no-fly zone patrols coupled with precision strikes on suspected command facilities.",
        decisionDna: {
          archetypeTitle: "Calculated Technocrat",
          portrait: "assets/images/dna-portraits/asiri-analist.png",
          archetypeDescription:
            "You prefer leverage at a distance. Precision and technology let you apply real pressure without bleeding your own people.",
          metrics: { vision: 70, courage: 65, risk: 50, control: 84, empathy: 55, ethics: 62 },
          patternNote:
            "You seek maximum operational leverage through superior standoff technology rather than risky ground entanglements. This reveals a tactical preference for calculated pressure while safeguarding your own personnel.",
          blindSpot: "Leaves foundational geopolitical issues unsolved while sustaining high ongoing costs.",
        },
      },
      {
        id: "opt_1_4",
        title: "Encourage Internal Military Coup",
        description:
          "Mobilize intelligence assets to sponsor military factions and dissidents inside Baghdad to depose Saddam Hussein.",
        decisionDna: {
          archetypeTitle: "Shadow Strategist",
          portrait: "assets/images/dna-portraits/sogukkanli-stratejist.png",
          archetypeDescription:
            "You never act in your own name. Covert proxies and quiet orchestration are, for you, the only way real change happens.",
          metrics: { vision: 82, courage: 70, risk: 75, control: 35, empathy: 40, ethics: 42 },
          patternNote:
            "You favor covert operations and third-party execution over open, direct national accountability. You believe systemic change is best orchestrated quietly from behind closed doors.",
          blindSpot: "Extreme vulnerability to intelligence leaks and unstable successor regimes.",
        },
      },
      {
        id: "opt_1_5",
        title: "Tightened Sanctions and Border Containment",
        description:
          "Restructure the Oil-for-Food framework and seal international borders to strangle the regime economically.",
        decisionDna: {
          archetypeTitle: "Attrition Realist",
          portrait: "assets/images/dna-portraits/temkinli-yenilikci.png",
          archetypeDescription:
            "You believe slow, systemic pressure beats sudden shocks. Institutions and supply lines, not armies, do the real work.",
          metrics: { vision: 58, courage: 35, risk: 25, control: 72, empathy: 38, ethics: 52 },
          patternNote:
            "You believe the most effective way to neutralize an adversary is through slow, systemic economic strangulation. You avoid sudden shocks in favor of sustained institutional siege.",
          blindSpot: "Collateral civilian economic suffering often outpaces pressure on entrenched ruling elites.",
        },
      },
    ],
  },
  {
    id: 2,
    title: "Cuban Missile Crisis",
    description: "A world on the brink of nuclear annihilation. You are in Kennedy's seat.",
    time: "1:25 min",
    image: "assets/images/scenarios/cuban_missile_crisis.jpeg",
    options: [
      {
        id: "opt_2_1",
        title: "Naval Quarantine",
        description:
          "Establish a naval blockade around Cuba to intercept Soviet shipments while conducting backchannel diplomacy.",
        decisionDna: {
          archetypeTitle: "Brave Visionary",
          portrait: "assets/images/dna-portraits/cesur-vizyoner.png",
          archetypeDescription:
            "You see the big picture and walk towards it — no matter the cost. Ethics sometimes take a back seat, but few surpass you in the courage to take action.",
          metrics: { vision: 88, courage: 82, risk: 79, control: 55, empathy: 38, ethics: 31 },
          patternNote:
            "You project immense resolve without prematurely closing off your adversary's path to de-escalation[cite: 6]. While accepting tremendous pressure, you carefully preserve room for strategic negotiation[cite: 6].",
          blindSpot: "Relies heavily on adversary rational behavior under intense operational friction.",
        },
      },
      {
        id: "opt_2_2",
        title: "Targeted Airstrikes",
        description: "Launch surgical airstrikes to neutralize the missile sites before they become operational.",
        decisionDna: {
          archetypeTitle: "Decisive Commander",
          portrait: "assets/images/dna-portraits/ilkeli-direnisci.png",
          archetypeDescription:
            "You refuse to tolerate existential threats on your border. Hesitation, in your view, is far more dangerous than escalation.",
          metrics: { vision: 62, courage: 94, risk: 96, control: 45, empathy: 20, ethics: 35 },
          patternNote:
            "You demand operational finality and refuse to tolerate immediate existential threats on your border. You would rather risk an outright war than project even a hint of hesitation.",
          blindSpot: "High probability of triggering uncontrolled nuclear chain reactions.",
        },
      },
      {
        id: "opt_2_3",
        title: "Full-Scale Amphibious Invasion",
        description:
          "Execute an invasion to overthrow the regime and seize direct control of the island's strategic zones.",
        decisionDna: {
          archetypeTitle: "Totalitarian Realist",
          portrait: "assets/images/dna-portraits/karizmatik-manipulator.png",
          archetypeDescription:
            "You erase the problem rather than manage it. Total control, in your eyes, leaves no room for an adversary to adapt or survive.",
          metrics: { vision: 50, courage: 90, risk: 95, control: 60, empathy: 18, ethics: 22 },
          patternNote:
            "Your mindset leans toward total eradication of adversary threats rather than containment or balance. You mobilize maximum resources to ensure absolute territorial control regardless of friction.",
          blindSpot: "Neglects operational intelligence regarding tactical nuclear battlefield readiness.",
        },
      },
      {
        id: "opt_2_4",
        title: "Diplomatic Missile Trade",
        description:
          "Secure an agreement via UN channels to trade US Jupiter missiles in Turkey and Italy for the removal of Soviet missiles.",
        decisionDna: {
          archetypeTitle: "Pragmatic Negotiator",
          portrait: "assets/images/dna-portraits/pragmatik-taktisyen.png",
          archetypeDescription:
            "You treat security as a dynamic equilibrium. Trading a small piece now to prevent catastrophe later is wisdom, never weakness.",
          metrics: { vision: 91, courage: 58, risk: 42, control: 68, empathy: 75, ethics: 78 },
          patternNote:
            "You view international security as a dynamic equilibrium where compromise is an act of foresight. You are willing to trade regional tactical chips to prevent global systemic catastrophe.",
          blindSpot: "Perceived domestic political weakness and alliance cohesion strains.",
        },
      },
      {
        id: "opt_2_5",
        title: "Passive Strategic Deterrence",
        description:
          "Avoid direct military intervention, raise NATO nuclear readiness to DEFCON 2, and compel Moscow to de-escalate.",
        decisionDna: {
          archetypeTitle: "Brinkmanship Gambler",
          portrait: "assets/images/dna-portraits/pragmatik-taktisyen-girl-2.png",
          archetypeDescription:
            "You apply pressure until the other side breaks. The moment of maximum tension is exactly where the outcome gets decided.",
          metrics: { vision: 74, courage: 85, risk: 88, control: 62, empathy: 30, ethics: 40 },
          patternNote:
            "You engage in psychological brinkmanship, daring your opponent to blink first under extreme strain. You rely on posturing and escalation dominance rather than localized battlefield solutions.",
          blindSpot: "Accidental hair-trigger escalations due to human radar warning error.",
        },
      },
    ],
  },
  {
    id: 3,
    title: "World War I",
    description:
      "1914. An archduke is assassinated and the mobilization telegram is on your desk. Your decision will drag empires into the trenches.",
    time: "1:30 min",
    image: "assets/images/scenarios/world_war_1.jpeg",
    options: [
      {
        id: "opt_3_1",
        title: "Harsh Ultimatum and Military Retribution",
        description: "Issue a 48-hour ultimatum with non-negotiable terms and invade Serbia immediately.",
        decisionDna: {
          archetypeTitle: "Imperial Hardliner",
          portrait: "assets/images/dna-portraits/ilkeli-direnisci-girl.png",
          archetypeDescription:
            "Pride and honour are non-negotiable. Any visible sign of restraint, in your view, only invites further aggression.",
          metrics: { vision: 45, courage: 86, risk: 94, control: 52, empathy: 15, ethics: 25 },
          patternNote:
            "You prioritize prestige, honor, and swift retribution far above international systemic stability. You believe displaying any sign of restraint invites further aggression from rivals.",
          blindSpot: "Blind to chain-reaction alliance mobilizations and long trench stalemates.",
        },
      },
      {
        id: "opt_3_2",
        title: "International Peace Conference",
        description:
          "Convene an eight-power diplomatic conference brokered by Britain and France to contain the regional crisis.",
        decisionDna: {
          archetypeTitle: "Multilateral Pacifist",
          portrait: "assets/images/dna-portraits/empatik-lider.png",
          archetypeDescription:
            "You place deep faith in collective diplomacy. Human life and continental peace outweigh any operational momentum.",
          metrics: { vision: 86, courage: 40, risk: 28, control: 62, empathy: 88, ethics: 92 },
          patternNote:
            "You place deep faith in collective diplomacy and mediation to diffuse hyper-nationalist fervor. You willingly sacrifice immediate operational momentum to preserve human life and continental peace.",
          blindSpot: "Can appear irresolute to aggressive factions exploiting delay to mobilize troops.",
        },
      },
      {
        id: "opt_3_3",
        title: "Localized Punitive Expedition",
        description:
          "Execute a swift, limited cross-border raid against assassination networks before Russian mobilization begins.",
        decisionDna: {
          archetypeTitle: "Surgical Operative",
          portrait: "assets/images/dna-portraits/kriz-yoneticisi.png",
          archetypeDescription:
            "You compartmentalize violence: precise, fast, and limited. Containment of the wider war is always the greater objective.",
          metrics: { vision: 68, courage: 75, risk: 65, control: 70, empathy: 42, ethics: 58 },
          patternNote:
            "You attempt to compartmentalize kinetic operations, delivering retribution while striving to contain wider war. You believe precision and speed can insulate you from broader geopolitical alliances.",
          blindSpot: "Assumes local containment is possible once national boundaries are violated.",
        },
      },
      {
        id: "opt_3_4",
        title: "Secure the German Blank Cheque",
        description:
          "Form a military pact with Berlin to deter Russian intervention before taking action against Serbia.",
        decisionDna: {
          archetypeTitle: "Coalition Realist",
          portrait: "assets/images/dna-portraits/fedakar-koruyucu.png",
          archetypeDescription:
            "You never stand alone. Binding stronger allies to your cause multiplies your deterrence before you ever move.",
          metrics: { vision: 72, courage: 62, risk: 85, control: 48, empathy: 28, ethics: 38 },
          patternNote:
            "You seek to anchor your strategic decisions within a broader defensive coalition before taking bold steps. You amplify your own deterrence by binding stronger allies directly to your cause.",
          blindSpot: "Surrenders strategic destiny to external alliance momentum.",
        },
      },
      {
        id: "opt_3_5",
        title: "Domestic Legal and Security Actions",
        description:
          "Avoid international military escalation and restrict counter-terrorism operations strictly within Austro-Hungarian borders.",
        decisionDna: {
          archetypeTitle: "Stoic Restrainer",
          portrait: "assets/images/dna-portraits/empatik-lider-boy.png",
          archetypeDescription:
            "You absorb external shocks and keep focus on internal order. Civil composure and legal rigor are your instruments.",
          metrics: { vision: 78, courage: 52, risk: 32, control: 86, empathy: 68, ethics: 84 },
          patternNote:
            "You deliberately internalize external shocks, keeping focus strictly on homeland stability and order. You value civil composure and legal rigor over external sabre-rattling.",
          blindSpot: "Leaves external conspiratorial apparatuses fully intact and emboldened.",
        },
      },
    ],
  },
  {
    id: 4,
    title: "World War II",
    description:
      "1945. The Manhattan Project report is on your desk. Your decision will unleash the atomic age and seal the fate of nations.",
    time: "1:32 min",
    image: "assets/images/scenarios/world_war_2.jpeg",
    options: [
      {
        id: "opt_4_1",
        title: "Deploy Atomic Weapons",
        description:
          "Drop atomic bombs on industrial-military targets to force an immediate and unconditional surrender.",
        decisionDna: {
          archetypeTitle: "Utilitarian Realist",
          portrait: "assets/images/dna-portraits/pragmatik-taktisyen-girl.png",
          archetypeDescription:
            "You calculate warfare in stark numbers. A concentrated sacrifice to halt wider bloodshed is, to you, the arithmetic of survival.",
          metrics: { vision: 82, courage: 85, risk: 80, control: 60, empathy: 22, ethics: 32 },
          patternNote:
            "You calculate warfare in stark numbers, sacrificing a concentrated area to halt wider systemic bloodshed. You choose immediate, brutal decisiveness over prolonged attrition.",
          blindSpot: "Introduces apocalyptic moral precedents and sets off an uncontainable global arms race.",
        },
      },
      {
        id: "opt_4_2",
        title: "Operation Downfall (Home Island Invasion)",
        description:
          "Carry out a large-scale amphibious assault on the Japanese mainland regardless of projected casualties.",
        decisionDna: {
          archetypeTitle: "Traditional General",
          portrait: "assets/images/dna-portraits/temkinli-yenilikci.png",
          archetypeDescription:
            "Doctrine is your anchor. You accept immense troop attrition as the natural price of an unconditional victory.",
          metrics: { vision: 48, courage: 92, risk: 88, control: 58, empathy: 28, ethics: 50 },
          patternNote:
            "You adhere strictly to conventional military doctrine, valuing decisive battlefield conquest over revolutionary weapons. You accept immense troop attrition as the natural cost of unconditional victory.",
          blindSpot: "Severe insensitivity to military casualty projections and prolonged operational attrition.",
        },
      },
      {
        id: "opt_4_3",
        title: "Comprehensive Naval and Air Siege",
        description:
          "Enforce a strict submarine and air blockade around the Japanese islands to starve military logistics.",
        decisionDna: {
          archetypeTitle: "Patient Siege-Master",
          portrait: "assets/images/dna-portraits/sogukkanli-stratejist.png",
          archetypeDescription:
            "Time is your weapon. You drain adversary capability while keeping your own forces safely out of reach.",
          metrics: { vision: 66, courage: 48, risk: 38, control: 82, empathy: 32, ethics: 48 },
          patternNote:
            "You believe time and logistical asphyxiation are far superior weapons than reckless frontline assaults. You systematically drain the adversary's capability while keeping your own forces safely out of reach.",
          blindSpot: "Prolongs civilian famine and leaves room for unexpected third-party interventions.",
        },
      },
      {
        id: "opt_4_4",
        title: "Technical Desert Demonstration",
        description:
          "Detonate the atomic bomb in an uninhabited desert or offshore area with Japanese observers to induce psychological shock.",
        decisionDna: {
          archetypeTitle: "Moral Idealist",
          portrait: "assets/images/dna-portraits/uyumcu.png",
          archetypeDescription:
            "You exhaust every ethical alternative first. If victory is still required, you reach for awe rather than annihilation.",
          metrics: { vision: 88, courage: 56, risk: 62, control: 64, empathy: 82, ethics: 94 },
          patternNote:
            "You explore every conceivable ethical alternative before unleashing irreversible destructive force on humans. You seek to achieve victory through psychological awe rather than physical annihilation.",
          blindSpot: "If the demonstration fails or is dismissed by the adversary, ultimate deterrence is compromised.",
        },
      },
      {
        id: "opt_4_5",
        title: "Conditional Surrender Negotiations",
        description:
          "Guarantee the preservation of the Emperor's status (Hirohito) through diplomatic backchannels to secure peace.",
        decisionDna: {
          archetypeTitle: "Pragmatic Statesman",
          portrait: "assets/images/dna-portraits/pragmatik-taktisyen.png",
          archetypeDescription:
            "You recognise that respecting an adversary’s core is the fastest road to lasting peace, not a sign of weakness.",
          metrics: { vision: 90, courage: 60, risk: 40, control: 74, empathy: 70, ethics: 76 },
          patternNote:
            "You recognize that respecting an adversary's cultural core is the fastest path to lasting peace. You prefer pragmatic compromise over ideological humiliation.",
          blindSpot: "Risks massive domestic backlash from populations demanding unconditional vengeance.",
        },
      },
    ],
  },
  {
    id: 5,
    title: "Vietnam War",
    description:
      "1964. The Gulf of Tonkin incident report is on your desk. Your decision will plunge a generation into the jungle.",
    time: "1:40 min",
    image: "assets/images/scenarios/vietnam_war.jpeg",
    options: [
      {
        id: "opt_5_1",
        title: "Congressional Resolution and Full Escalation",
        description:
          "Pass the Tonkin Resolution, grant broad executive military authority, and commit regular ground troops to the north.",
        decisionDna: {
          archetypeTitle: "Dogmatic Interventionist",
          portrait: "assets/images/dna-portraits/bodozlama-dalasan.png",
          archetypeDescription:
            "You read every crisis through an ideological lens. Commitment escalates on principle, never on calculation.",
          metrics: { vision: 60, courage: 84, risk: 89, control: 45, empathy: 24, ethics: 30 },
          patternNote:
            "You view local conflicts through a rigid ideological lens, escalating commitments without hesitation. You leverage crisis moments to secure sweeping executive power.",
          blindSpot: "Traps the nation in an unwinnable, asymmetric counter-insurgency jungle quagmire.",
        },
      },
      {
        id: "opt_5_2",
        title: "Limited Retaliatory Air Sorties",
        description:
          "Conduct a single, proportionate series of airstrikes targeting coastal torpedo facilities and naval infrastructure.",
        decisionDna: {
          archetypeTitle: "Proportionate Balancer",
          portrait: "assets/images/dna-portraits/pragmatik-taktisyen-girl-2.png",
          archetypeDescription:
            "You calibrate every response. Strength is demonstrated, boundaries re-established, and total war quietly avoided.",
          metrics: { vision: 70, courage: 62, risk: 52, control: 76, empathy: 48, ethics: 64 },
          patternNote:
            "You prefer calibrated, proportional responses that demonstrate strength without provoking total war. You seek to re-establish boundaries through controlled tactical signals.",
          blindSpot: "Often misread as weakness by ideologically committed guerrilla forces.",
        },
      },
      {
        id: "opt_5_3",
        title: "Covert Irregular Warfare (OPLAN 34A)",
        description:
          "Avoid formal warfare by deploying special forces, local proxies, and sabotage teams along northern supply lines.",
        decisionDna: {
          archetypeTitle: "Denial Operator",
          portrait: "assets/images/dna-portraits/karizmatik-manipulator.png",
          archetypeDescription:
            "You operate where accountability cannot reach. Quiet disruption, no official declaration, no paper trail.",
          metrics: { vision: 65, courage: 68, risk: 68, control: 58, empathy: 36, ethics: 44 },
          patternNote:
            "You favor deniable, asymmetric operations that minimize public scrutiny and formal accountability. You attempt to disrupt enemy networks quietly while avoiding official military declarations.",
          blindSpot: "Creeping operational escalation without clear exit criteria or moral accountability.",
        },
      },
      {
        id: "opt_5_4",
        title: "Reaffirmation of Geneva Accords",
        description: "Demand a UN neutral observer mission to enforce demilitarization along the 17th parallel.",
        decisionDna: {
          archetypeTitle: "Legalistic Pacifist",
          portrait: "assets/images/dna-portraits/empatik-lider.png",
          archetypeDescription:
            "Treaties and neutral observers are your primary shield. Legal accountability, in your view, is the only lasting stability.",
          metrics: { vision: 84, courage: 42, risk: 34, control: 66, empathy: 86, ethics: 90 },
          patternNote:
            "You turn to international treaties and multinational observers as your primary shield against crisis. You believe legal accountability and multilateral bodies provide the only lasting stability.",
          blindSpot: "Easily bypassed by asymmetric guerilla logistics networks (e.g., Ho Chi Minh Trail).",
        },
      },
      {
        id: "opt_5_5",
        title: "Strategic Disengagement and Proxy Arming",
        description:
          "Shift direct operational responsibility to the South Vietnamese army while limiting US engagement to logistics and advisory roles.",
        decisionDna: {
          archetypeTitle: "Realpolitik Auditor",
          portrait: "assets/images/dna-portraits/asiri-analist.png",
          archetypeDescription:
            "You measure intervention strictly by strategic return. Local partners carry the burden; you preserve the resources.",
          metrics: { vision: 76, courage: 54, risk: 46, control: 70, empathy: 52, ethics: 60 },
          patternNote:
            "You protect your core strategic resources by requiring local partners to shoulder the direct burden of conflict. You measure military intervention strictly by strategic return on investment.",
          blindSpot: "Leads to rapid local proxy collapse if recipient institutions suffer systemic corruption.",
        },
      },
    ],
  },
];
