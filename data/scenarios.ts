export interface ScenarioOption {
  id: string;
  title: string;
  description: string;
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
      },
      {
        id: "opt_1_2",
        title: "Extended UN Weapons Inspections",
        description:
          "Grant UNMOVIC teams additional operational leeway and time under strict aerial and border surveillance.",
      },
      {
        id: "opt_1_3",
        title: "Strategic Airstrikes and Expanded No-Fly Zones",
        description:
          "Enforce intensified no-fly zone patrols coupled with precision strikes on suspected command facilities.",
      },
      {
        id: "opt_1_4",
        title: "Encourage Internal Military Coup",
        description:
          "Mobilize intelligence assets to sponsor military factions and dissidents inside Baghdad to depose Saddam Hussein.",
      },
      {
        id: "opt_1_5",
        title: "Tightened Sanctions and Border Containment",
        description:
          "Restructure the Oil-for-Food framework and seal international borders to strangle the regime economically.",
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
      },
      {
        id: "opt_2_2",
        title: "Targeted Airstrikes",
        description: "Launch surgical airstrikes to neutralize the missile sites before they become operational.",
      },
      {
        id: "opt_2_3",
        title: "Full-Scale Amphibious Invasion",
        description:
          "Execute an invasion to overthrow the regime and seize direct control of the island's strategic zones.",
      },
      {
        id: "opt_2_4",
        title: "Diplomatic Missile Trade",
        description:
          "Secure an agreement via UN channels to trade US Jupiter missiles in Turkey and Italy for the removal of Soviet missiles.",
      },
      {
        id: "opt_2_5",
        title: "Passive Strategic Deterrence",
        description:
          "Avoid direct military intervention, raise NATO nuclear readiness to DEFCON 2, and compel Moscow to de-escalate.",
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
      },
      {
        id: "opt_3_2",
        title: "International Peace Conference",
        description:
          "Convene an eight-power diplomatic conference brokered by Britain and France to contain the regional crisis.",
      },
      {
        id: "opt_3_3",
        title: "Localized Punitive Expedition",
        description:
          "Execute a swift, limited cross-border raid against assassination networks before Russian mobilization begins.",
      },
      {
        id: "opt_3_4",
        title: "Secure the German Blank Cheque",
        description:
          "Form a military pact with Berlin to deter Russian intervention before taking action against Serbia.",
      },
      {
        id: "opt_3_5",
        title: "Domestic Legal and Security Actions",
        description:
          "Avoid international military escalation and restrict counter-terrorism operations strictly within Austro-Hungarian borders.",
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
      },
      {
        id: "opt_4_2",
        title: "Operation Downfall (Home Island Invasion)",
        description:
          "Carry out a large-scale amphibious assault on the Japanese mainland regardless of projected casualties.",
      },
      {
        id: "opt_4_3",
        title: "Comprehensive Naval and Air Siege",
        description:
          "Enforce a strict submarine and air blockade around the Japanese islands to starve military logistics.",
      },
      {
        id: "opt_4_4",
        title: "Technical Desert Demonstration",
        description:
          "Detonate the atomic bomb in an uninhabited desert or offshore area with Japanese observers to induce psychological shock.",
      },
      {
        id: "opt_4_5",
        title: "Conditional Surrender Negotiations",
        description:
          "Guarantee the preservation of the Emperor's status (Hirohito) through diplomatic backchannels to secure peace.",
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
      },
      {
        id: "opt_5_2",
        title: "Limited Retaliatory Air Sorties",
        description:
          "Conduct a single, proportionate series of airstrikes targeting coastal torpedo facilities and naval infrastructure.",
      },
      {
        id: "opt_5_3",
        title: "Covert Irregular Warfare (OPLAN 34A)",
        description:
          "Avoid formal warfare by deploying special forces, local proxies, and sabotage teams along northern supply lines.",
      },
      {
        id: "opt_5_4",
        title: "Reaffirmation of Geneva Accords",
        description: "Demand a UN neutral observer mission to enforce demilitarization along the 17th parallel.",
      },
      {
        id: "opt_5_5",
        title: "Strategic Disengagement and Proxy Arming",
        description:
          "Shift direct operational responsibility to the South Vietnamese army while limiting US engagement to logistics and advisory roles.",
      },
    ],
  },
];
