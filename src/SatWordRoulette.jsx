import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Heart, Flame, RotateCw, Trophy, Check, X, Sparkles, RefreshCcw, Info } from "lucide-react";

/* ---------------------------------------------------------------------- */
/* WORD BANK — top 200 August-SAT vocabulary words                        */
/* [word, definition, sentence containing the word]                       */
/* ---------------------------------------------------------------------- */
const RAW_BANK = [
["aberration","a departure from what is normal or expected","Her outburst was an aberration; she is usually calm."],
["abate","to become less intense","The storm began to abate by midnight."],
["abstain","to choose not to do something","He decided to abstain from voting on the issue."],
["acumen","keen insight and sound judgment","Her business acumen helped the company grow quickly."],
["adversity","difficult or unfavorable circumstances","The team stayed united despite great adversity."],
["aesthetic","concerned with beauty or artistic taste","The museum's aesthetic appeal drew huge crowds."],
["alacrity","brisk and eager willingness","She accepted the challenge with alacrity."],
["altruistic","selflessly concerned for others' welfare","His altruistic donations helped the shelter survive."],
["ambiguous","open to more than one interpretation","The contract's ambiguous wording caused disputes."],
["ambivalent","having mixed or contradictory feelings","She felt ambivalent about moving to a new city."],
["anomaly","something that deviates from the norm","The scientist noted a strange anomaly in the data."],
["antipathy","a deep-seated feeling of dislike","The rivals shared a lasting antipathy."],
["apathy","lack of interest or concern","Voter apathy led to a very low turnout."],
["arbitrary","based on random choice rather than reason","The new rule seemed arbitrary and unfair."],
["articulate","able to express oneself clearly and fluently","The articulate speaker won over the entire crowd."],
["ascetic","practicing severe self-discipline and abstinence","The monk lived an ascetic life in the mountains."],
["assiduous","showing great care, effort, and diligence","Her assiduous studying paid off on the final exam."],
["audacious","showing a bold, daring willingness to take risks","The audacious escape plan surprised everyone."],
["austere","stern or severely simple in appearance","The room had an austere, minimalist design."],
["autonomous","self-governing, independent","The region became an autonomous state after the treaty."],
["benevolent","well-meaning and kindly","The benevolent king cared deeply for his people."],
["candid","truthful and straightforward; frank","She gave a candid account of the accident."],
["capricious","given to sudden, unpredictable changes","The capricious weather ruined our picnic plans."],
["catalyst","a person or thing that provokes change","The speech became a catalyst for reform."],
["caustic","sarcastic in a hurtful, biting way","His caustic remarks upset the whole room."],
["coherent","logical and consistent; easy to follow","She presented a coherent argument to the board."],
["complacent","self-satisfied and unconcerned about risk","Early success made the team complacent."],
["concise","giving information clearly in few words","The report was concise and easy to follow."],
["condone","to accept and allow behavior that is wrong","The coach would not condone cheating of any kind."],
["congenial","pleasant and agreeable in disposition","The congenial host made every guest feel welcome."],
["conundrum","a confusing and difficult problem","The old riddle was a real conundrum."],
["convoluted","extremely complex and hard to follow","The plot was so convoluted no one could summarize it."],
["credible","able to be believed; convincing","Her testimony was credible and highly detailed."],
["cursory","hasty and not thorough","He gave the report only a cursory glance."],
["cynical","distrustful of human sincerity or motives","His cynical attitude annoyed his coworkers."],
["deference","humble submission and respect for another's wishes","She showed deference to her elders during dinner."],
["deleterious","causing harm or damage","Smoking has a deleterious effect on health."],
["denounce","to publicly condemn something as wrong","The senator chose to denounce the new policy."],
["deride","to express contempt for; ridicule","Critics would deride the film's weak script."],
["despot","a ruler with absolute, often cruel power","The despot ruled the nation with an iron fist."],
["deter","to discourage someone from acting","Steep fines are meant to deter littering."],
["diligent","showing careful and persistent effort","The diligent student reviewed her notes every day."],
["discern","to perceive or recognize something clearly","It was hard to discern his true intentions."],
["disdain","a feeling of contempt or scorn","She viewed the low offer with disdain."],
["disparage","to speak of in a belittling way","He would often disparage his rival's work."],
["disparate","essentially different in kind; not comparable","The committee combined disparate viewpoints into one plan."],
["dogmatic","assertively certain of unproven beliefs","His dogmatic views left no room for debate."],
["dubious","hesitant or doubting; of questionable value","She was dubious about the plan's chances of success."],
["eclectic","deriving ideas from a broad range of sources","The playlist had an eclectic mix of genres."],
["egregious","outstandingly bad; shocking","The referee made an egregious officiating error."],
["elated","filled with great happiness and pride","She felt elated after winning the scholarship."],
["eloquent","fluent and persuasive in speaking or writing","His eloquent speech moved the entire audience."],
["elusive","difficult to find, catch, or achieve","The elusive suspect avoided capture for weeks."],
["empirical","based on observation or experiment, not theory","The study relied on solid empirical evidence."],
["emulate","to try to match something by imitation","Young players often emulate their favorite heroes."],
["endemic","regularly found in a particular area or group","Malaria is endemic to parts of the region."],
["enervate","to weaken or drain of energy","The scorching heat seemed to enervate the whole crew."],
["enigma","a mysterious or puzzling person or thing","The ancient text remains an enigma to scholars."],
["ephemeral","lasting for a very short time","The cherry blossoms are beautifully ephemeral."],
["equanimity","mental calmness in a difficult situation","She faced the crisis with remarkable equanimity."],
["equivocal","open to more than one interpretation; vague","His equivocal answer satisfied absolutely no one."],
["erratic","unpredictable and inconsistent in behavior","The driver's erratic behavior alarmed the passengers."],
["esoteric","understood by only a small, specialized group","The lecture covered a fairly esoteric mathematical theory."],
["euphemism","a mild expression substituted for a harsh one","'Passed away' is a common euphemism for death."],
["exacerbate","to make a problem or situation worse","The long delay only served to exacerbate tensions."],
["exemplary","serving as a desirable model; outstanding","Her exemplary work quickly earned her a promotion."],
["exonerate","to officially clear someone of blame","New evidence helped exonerate the wrongly accused man."],
["extraneous","irrelevant or unnecessary to the main point","He cut all the extraneous details from his essay."],
["fallacy","a mistaken belief, often based on faulty logic","It's a fallacy that hard work alone guarantees success."],
["fastidious","very attentive to accuracy and detail","The fastidious editor caught every single typo."],
["fervent","having or displaying passionate intensity","She is a fervent supporter of the recycling program."],
["flagrant","conspicuously and shockingly bad or offensive","The referee called an obvious, flagrant foul."],
["fortuitous","happening by a lucky chance","Their first meeting was entirely fortuitous."],
["frivolous","not serious or sensible; silly","The judge quickly dismissed the frivolous lawsuit."],
["futile","incapable of producing any useful result","Their efforts to fix the old engine were futile."],
["garrulous","excessively talkative, especially about trivial things","The garrulous neighbor talked for nearly an hour."],
["gratuitous","uncalled for; lacking justification","Critics said the film had gratuitous violence."],
["gregarious","fond of company; sociable","She has always had a gregarious personality."],
["hackneyed","overused and lacking originality","The plot relied on tired, hackneyed clichés."],
["haughty","arrogantly proud and disdainful","His haughty attitude alienated his coworkers."],
["hedonist","a person devoted to the pursuit of pleasure","The hedonist lived only for his own enjoyment."],
["hyperbole","exaggerated statements not meant to be taken literally","Saying you're 'starving' before dinner is usually hyperbole."],
["iconoclast","a person who attacks cherished beliefs or traditions","The artist was widely seen as an iconoclast."],
["idiosyncratic","peculiar or distinctive to an individual","Her idiosyncratic style set her apart from every rival."],
["ignominious","deserving or causing public disgrace","The champions suffered an ignominious defeat."],
["immutable","unchanging over time; unable to be altered","Physical laws are generally considered immutable."],
["impartial","treating all sides or rivals equally; fair","The judge remained impartial throughout the long trial."],
["impetuous","acting or done quickly without thought","His impetuous decision led to years of regret."],
["implacable","unable to be appeased or calmed down","She faced an implacable and relentless opponent."],
["incessant","continuing without pause or interruption","The incessant noise from the street kept us awake."],
["incongruous","strikingly out of place; inconsistent","The new skyscraper looked incongruous next to the old town."],
["inevitable","certain to happen; unavoidable","Change felt inevitable in the fast-growing city."],
["ingenuous","innocent, unsuspecting, and openly straightforward","The ingenuous child trusted every stranger she met."],
["innocuous","not harmful or offensive","It seemed like an entirely innocuous comment at the time."],
["insipid","lacking flavor, vigor, or interest","The soup was bland and completely insipid."],
["insular","narrow-minded and isolated from outside influence","Their insular community rarely welcomed outsiders."],
["intransigent","unwilling to compromise or change one's views","The intransigent senator blocked the popular bill."],
["inundate","to overwhelm with things to deal with","Complaints began to inundate the customer service line."],
["irascible","easily angered; hot-tempered","The irascible coach yelled after every small mistake."],
["jubilant","feeling or expressing great happiness","Fans were jubilant after the last-second victory."],
["juxtapose","to place things side by side for contrast","The exhibit likes to juxtapose ancient artifacts with modern art."],
["laconic","using very few words; terse","His laconic reply gave nothing away."],
["lament","to express deep sorrow or regret for","She would often lament the loss of the old theater."],
["latent","existing but not yet developed or visible","He had a latent talent for music no one noticed."],
["lethargic","lacking energy; sluggish and drowsy","The midsummer heat made everyone feel lethargic."],
["loquacious","very talkative","The loquacious tour guide never once stopped narrating."],
["lucid","expressed clearly; easy to understand","She gave a remarkably lucid explanation of the theory."],
["magnanimous","generous or forgiving, especially toward a rival","The champion was magnanimous in victory."],
["malleable","easily influenced, shaped, or persuaded","Young minds are often especially malleable."],
["meticulous","showing great attention to detail; very careful","The meticulous chef measured every single ingredient."],
["mitigate","to make a problem less severe","New drainage systems aim to mitigate flooding risks."],
["mundane","lacking excitement; dull and ordinary","He grew tired of his mundane daily routine."],
["myriad","a very great, countless number of things","The festival offered a myriad of activities for kids."],
["nefarious","wicked or criminal in nature","The villain's nefarious plan was foiled at the last minute."],
["nostalgic","feeling sentimental longing for the past","The old photographs made her deeply nostalgic."],
["notorious","famous or well known for something bad","The gang was notorious throughout the entire city."],
["novice","a person new to or inexperienced in a skill","As a novice, she made a few understandable mistakes."],
["obdurate","stubbornly refusing to change one's opinion","He remained obdurate despite all of their pleas."],
["obscure","not well known; hard to understand","The essay referenced an extremely obscure poet."],
["obsequious","excessively eager to please or obey","The obsequious waiter fawned over every single guest."],
["obstinate","stubbornly refusing to change one's mind","The obstinate old mule simply wouldn't move."],
["opulent","luxurious and expensive in appearance","The opulent mansion was filled with gold fixtures."],
["ostentatious","designed to impress others; showy","His ostentatious sports car drew stares on every block."],
["paradox","a statement that seems contradictory yet may be true","It's a paradox that sometimes less truly is more."],
["partisan","strongly and often blindly biased in support of a side","The debate in Congress grew fiercely partisan."],
["pedantic","overly concerned with minor details or rules","The pedantic teacher corrected every misplaced comma."],
["perfunctory","done routinely, with little interest or effort","He gave a perfunctory nod and quickly left the room."],
["pernicious","having a gradually harmful effect","Rumors can have a pernicious influence on a community."],
["perpetual","never ending or changing; continuous","The city seemed to be in a state of perpetual motion."],
["pervasive","spreading widely throughout an area or group","A pervasive smell of smoke filled the old building."],
["philanthropic","concerned with promoting the welfare of others","The billionaire funded many philanthropic causes."],
["placate","to make someone less angry or hostile","She tried to placate the upset customer with a refund."],
["plausible","seeming reasonable or probable; believable","His excuse sounded plausible at first, but fell apart."],
["precarious","not securely held or in position; risky","The old ladder was balanced in a precarious position."],
["precocious","showing advanced ability or maturity at a young age","The precocious child was reading novels by age six."],
["predilection","a preference or special liking for something","She has a strong predilection for spicy food."],
["pretentious","attempting to impress by affecting greater importance","His pretentious speech bored most of the audience."],
["pristine","in its original condition; unspoiled","The pristine forest had never once been logged."],
["prodigal","wastefully extravagant with money or resources","The prodigal son spent his entire fortune within a year."],
["profound","very great or intense; showing deep insight","The book had a profound impact on how she thought."],
["prolific","producing much or many in great abundance","The prolific author published a new novel every year."],
["propensity","a natural tendency to behave in a certain way","He has a propensity for exaggeration when telling stories."],
["prosaic","lacking imagination or excitement; dull","Her prosaic writing style failed to engage readers."],
["provincial","narrow in outlook; unsophisticated","His provincial views surprised the well-traveled city dwellers."],
["prudent","acting with care and thought for the future","It was prudent of them to save for emergencies."],
["quandary","a state of uncertainty over what to do","She was in a real quandary about which job to accept."],
["quixotic","extravagantly idealistic and unrealistic","His quixotic plan to end poverty overnight quickly failed."],
["rancor","bitterness or resentment held over time","Years of rancor divided the two once-close families."],
["recalcitrant","having an obstinately uncooperative attitude","The recalcitrant employee ignored every single instruction."],
["reclusive","avoiding the company of other people","The reclusive author rarely gave interviews to anyone."],
["redundant","no longer needed; superfluous","The report contained several redundant sentences."],
["refute","to prove that something is wrong or false","New data helped refute the long-accepted old theory."],
["relegate","to assign to an inferior rank or position","The coach chose to relegate the struggling player to the bench."],
["reticent","reserved and not revealing one's thoughts easily","He was reticent about discussing his personal life."],
["reverence","deep respect for someone or something","Visitors approached the ancient shrine with reverence."],
["rhetoric","language designed to persuade or influence","The candidate's fiery rhetoric energized the crowd."],
["sagacious","having or showing keen judgment; wise","The sagacious advisor guided the young king well."],
["sanguine","optimistic, especially in a difficult situation","She remained sanguine despite the disappointing setback."],
["scrupulous","diligent, thorough, and extremely careful","He was scrupulous about following every safety rule."],
["skeptical","not easily convinced; having doubts","She remained skeptical of the salesman's bold claims."],
["solace","comfort received in a time of distress","Music gave her great solace after the difficult loss."],
["solvent","having enough money to pay all debts","The small company remained solvent through the recession."],
["sparse","thinly scattered or distributed","The desert region had only sparse, scraggly vegetation."],
["spurious","not genuine or authentic; false","The spurious claim was quickly debunked by reporters."],
["stagnant","showing no activity or movement; dull","The stagnant pond behind the barn bred mosquitoes."],
["staid","sedate, respectable, and rather dull","The staid old banker rarely took any risks at all."],
["stoic","enduring hardship or pain without complaint","He remained stoic throughout the entire long surgery."],
["stringent","strict, precise, and rigorously enforced","New stringent safety rules were put in place."],
["subtle","so delicate or precise as to be difficult to detect","There was a subtle change in her tone of voice."],
["succinct","expressed briefly and clearly; concise","Her succinct summary saved the whole team a lot of time."],
["superficial","only concerned with the obvious; shallow","His analysis of the crisis was superficial at best."],
["superfluous","unnecessary, especially through being more than enough","He removed every superfluous detail from his essay."],
["surreptitious","kept secret, especially because it would not be approved of","She took a surreptitious glance at her phone in class."],
["sycophant","a person who flatters others for personal gain","Everyone at court could tell he was just a sycophant."],
["taciturn","reserved and saying very little","The taciturn old farmer rarely spoke to strangers."],
["tangential","only slightly relevant to the main subject","His tangential comments completely derailed the meeting."],
["tenacious","persistent and determined; not letting go","The tenacious reporter refused to give up on the story."],
["tenuous","very weak or slight; flimsy","The evidence connecting the two events was tenuous at best."],
["terse","brief and to the point, sometimes rudely so","His terse reply left no room for any follow-up questions."],
["tirade","a long, angry speech of criticism","The coach launched into a tirade after the tough loss."],
["torpid","mentally or physically inactive; sluggish","The lizard grew torpid in the cold morning air."],
["tractable","easily controlled, taught, or managed","The tractable young horse followed every single command."],
["transient","lasting only for a short time; temporary","The small town saw many transient summer visitors."],
["trepidation","a feeling of fear or anxiety about something","She approached the big interview with real trepidation."],
["trivial","of little value or importance","They wasted an hour arguing over a trivial matter."],
["ubiquitous","present, appearing, or found everywhere","Smartphones have become nearly ubiquitous in daily life."],
["unprecedented","never done or known before","The storm caused unprecedented damage across the coastline."],
["vacillate","to waver indecisively between two choices","He continued to vacillate over which college to attend."],
["venerate","to regard with great respect or reverence","People in that small community venerate their oldest elders."],
["veracity","conformity to facts; truthfulness","The reporter questioned the veracity of the official claim."],
["verbose","using more words than are needed; wordy","His verbose report exhausted his already busy editor."],
["vindicate","to clear someone of blame or suspicion","The new verdict served to vindicate her complete innocence."],
["virtuoso","a person highly skilled in an art, especially music","The young violinist was hailed as a true virtuoso."],
["vociferous","vehement and loud in expressing one's views","The vociferous crowd loudly demanded an immediate refund."],
["volatile","liable to change rapidly and unpredictably","The tech stock market has been extremely volatile lately."],
["whimsical","playfully quaint or fanciful in a light way","The garden had a whimsical, storybook feel to it."],
["zealous","showing great energy and enthusiasm for a cause","The zealous volunteers worked around the clock all week."],
["zenith","the highest point reached, as of power or fame","The ancient empire reached its zenith in that century."],
["abstruse","difficult to understand; obscure","The abstruse physics lecture confused most of the students."],
["acerbic","sharp, forthright, and often biting in speech","Her acerbic wit made even seasoned critics nervous."],
["placid","calm and peaceful; not easily disturbed","The lake was placid on that still summer morning."],
["mollify","to soothe someone's anger or distress","The manager tried to mollify the furious customer."],
["obfuscate","to make something unclear or hard to understand","The lawyer seemed to obfuscate the simple facts."],
["ominous","giving the impression that something bad will happen","Dark, ominous clouds gathered over the small village."],
["opaque","not able to be seen through; hard to understand","The company's finances remained frustratingly opaque."],
["paucity","the presence of something in small quantity","There was a paucity of evidence to support the claim."],
["penchant","a strong or habitual liking for something","She has a penchant for old detective novels."],
["perpetuate","to make something continue indefinitely","The policy only served to perpetuate the old inequality."],
["pinnacle","the most successful point; the highest peak","Winning the championship was the pinnacle of her career."],
["plethora","a very large or excessive amount of something","The buffet offered a plethora of dessert options."],
["poignant","evoking a keen sense of sadness or regret","The film's ending was quiet but deeply poignant."],
["pragmatic","dealing with things sensibly and realistically","She took a pragmatic approach to solving the budget crisis."],
["rebuke","to express sharp disapproval; a stern reprimand","The coach issued a rebuke after the missed practice."],
["repudiate","to refuse to accept or be associated with","He chose to publicly repudiate the extreme views of the group."],
["rescind","to revoke or cancel an official decision","The school chose to rescind the controversial new policy."],
["resolute","admirably purposeful and unwavering","She remained resolute in her decision to finish the race."],
["salient","most noticeable or important; prominent","The report's most salient point was the rising cost."],
["scathing","witheringly harsh in tone; severely critical","The critic wrote a scathing review of the new film."],
["squander","to waste money, time, or opportunity carelessly","He would often squander his allowance on candy."],
["substantiate","to provide evidence to support a claim","The lawyer could not substantiate her client's alibi."],
["truculent","eager or quick to argue or fight","The truculent customer argued with every employee he met."],
["tumultuous","marked by loud confusion or disorder","The band received a tumultuous welcome from the fans."],
["urbane","suave, courteous, and refined in manner","The urbane diplomat charmed every guest at the gala."],
["usurp","to take a position of power illegally or by force","The general tried to usurp the throne from the king."],
["vagrant","a person without a settled home; wandering","The vagrant traveler moved from town to town."],
["vapid","lacking interest, spirit, or flavor; dull","The sequel felt vapid compared to the original film."],
["vehement","showing strong, forceful feeling","He offered a vehement denial of the accusation."],
["venerable","accorded great respect due to age or wisdom","The venerable professor had taught for over forty years."],
["vicarious","experienced through the feelings of another person","She felt a vicarious thrill watching her daughter perform."],
["vigilant","keeping careful watch for possible danger","The vigilant guard noticed the broken lock right away."],
["vilify","to speak or write about in an abusively critical way","The press tended to vilify the unpopular new mayor."]
];

const WORD_BANK = RAW_BANK.map(([word, definition, sentence], i) => ({
  id: `w${i}`,
  word,
  definition,
  sentence,
}));

/* ---------------------------------------------------------------------- */
/* Helpers                                                                 */
/* ---------------------------------------------------------------------- */

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function stringToSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h;
}

function seededShuffle(arr, rand) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getDailyWords() {
  const seed = stringToSeed(new Date().toDateString());
  const rand = mulberry32(seed);
  const shuffled = seededShuffle(WORD_BANK, rand);
  return shuffled.slice(0, 9);
}

function sampleOthers(bank, excludeId, n) {
  const pool = bank.filter((w) => w.id !== excludeId);
  return shuffle(pool).slice(0, n);
}

function splitSentence(sentence, word) {
  const re = new RegExp(`\\b(${word})\\b`, "i");
  const match = sentence.match(re);
  if (!match) return { before: sentence, match: word, after: "" };
  const idx = match.index;
  return {
    before: sentence.slice(0, idx),
    match: match[1],
    after: sentence.slice(idx + match[1].length),
  };
}

function defaultModeForIndex(i) {
  if (i < 3) return "vocab";
  if (i < 6) return "meaning";
  return "scenario";
}

const MODES = {
  vocab: {
    key: "vocab",
    label: "Vocab",
    tag: "WORD → DEFINITION",
    desc: "A word is shown. Pick its correct definition.",
  },
  meaning: {
    key: "meaning",
    label: "Meaning",
    tag: "SENTENCE → DEFINITION",
    desc: "The word appears underlined in a sentence. Pick what it means there.",
  },
  scenario: {
    key: "scenario",
    label: "Scenario",
    tag: "SENTENCE → WORD",
    desc: "A sentence has a blank. Pick the word that fits best.",
  },
};

function buildQuestion(wordObj, mode, bank) {
  if (mode === "scenario") {
    const distractors = sampleOthers(bank, wordObj.id, 3);
    const options = shuffle([
      { text: wordObj.word, isCorrect: true },
      ...distractors.map((d) => ({ text: d.word, isCorrect: false })),
    ]);
    return {
      mode,
      wordId: wordObj.id,
      prompt: splitSentence(wordObj.sentence, wordObj.word),
      options,
      correctIndex: options.findIndex((o) => o.isCorrect),
    };
  }
  const distractors = sampleOthers(bank, wordObj.id, 3);
  const options = shuffle([
    { text: wordObj.definition, isCorrect: true },
    ...distractors.map((d) => ({ text: d.definition, isCorrect: false })),
  ]);
  return {
    mode,
    wordId: wordObj.id,
    prompt:
      mode === "meaning"
        ? splitSentence(wordObj.sentence, wordObj.word)
        : { word: wordObj.word },
    options,
    correctIndex: options.findIndex((o) => o.isCorrect),
  };
}

const START_LIVES = 3;
const SEG_ANGLE = 360 / 9;
const RADIUS = 126;
const WHEEL_SIZE = 380;

/* Softer, more restrained palette */
const C = {
  bg1: "#132C22",
  bg2: "#0A1F17",
  bg3: "#070F0A",
  ink: "#EDE7D9",
  inkDim: "#A9B8AC",
  inkFaint: "#7E8F82",
  gold: "#C9A961",
  goldBright: "#D9BC72",
  goldSoft: "rgba(201,169,97,0.14)",
  good: "#7FC49A",
  bad: "#CE8286",
  amber: "#C7A05C",
  panel: "rgba(0,0,0,0.22)",
  panelBorder: "rgba(237,231,217,0.10)",
};

/* A jewel-toned spectrum for the 9 wheel segments — emerald through sapphire
   to amethyst and rose, all deep and desaturated enough to feel refined
   rather than a rainbow. Alternating lightness adds a faceted, gem-cut feel. */
function segmentColor(i, total) {
  const hue = 150 + (i * (335 - 150)) / (total - 1);
  const light = i % 2 === 0 ? 24 : 19;
  return `hsl(${hue}, 40%, ${light}%)`;
}

/* ---------------------------------------------------------------------- */
/* Component                                                               */
/* ---------------------------------------------------------------------- */

export default function SatWordRoulette() {
  const dailyWords = useMemo(() => getDailyWords(), []);
  const wordById = useMemo(() => {
    const m = {};
    dailyWords.forEach((w) => (m[w.id] = w));
    return m;
  }, [dailyWords]);

  const [remainingIds, setRemainingIds] = useState(() => dailyWords.map((w) => w.id));
  const [solvedIds, setSolvedIds] = useState([]);
  const [spinOrder, setSpinOrder] = useState([]);
  const [currentMode, setCurrentMode] = useState("vocab");
  const [currentWordId, setCurrentWordId] = useState(null);
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [lives, setLives] = useState(START_LIVES);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [justLanded, setJustLanded] = useState(false);

  const spinningRef = useRef(false);

  const handleModeChange = useCallback(
    (m) => {
      if (spinningRef.current) return;
      setCurrentMode(m);
      if (currentWordId && !isAnswered) {
        setQuestion(buildQuestion(wordById[currentWordId], m, dailyWords));
      }
    },
    [currentWordId, isAnswered, wordById, dailyWords]
  );

  const handleSpin = useCallback(() => {
    if (spinningRef.current || currentWordId || remainingIds.length === 0 || gameOver) return;
    spinningRef.current = true;
    setSpinning(true);

    const idx = Math.floor(Math.random() * remainingIds.length);
    const wordId = remainingIds[idx];
    const segIndex = dailyWords.findIndex((w) => w.id === wordId);
    const targetCenter = segIndex * SEG_ANGLE + SEG_ANGLE / 2;
    const targetMod = (360 - targetCenter + 360) % 360;

    setRotation((prev) => {
      const currentMod = ((prev % 360) + 360) % 360;
      let delta = targetMod - currentMod;
      if (delta <= 0) delta += 360;
      return prev + delta + 360 * 4;
    });

    const firstTime = !spinOrder.includes(wordId);
    const modeForThis = currentMode;

    window.setTimeout(() => {
      setCurrentWordId(wordId);
      setCurrentMode(modeForThis);
      if (firstTime) setSpinOrder((so) => [...so, wordId]);
      setQuestion(buildQuestion(wordById[wordId], modeForThis, dailyWords));
      setIsAnswered(false);
      setSelectedOption(null);
      setSpinning(false);
      spinningRef.current = false;
      setJustLanded(true);
      window.setTimeout(() => setJustLanded(false), 1000);
    }, 3000);
  }, [remainingIds, currentWordId, gameOver, dailyWords, spinOrder, currentMode, wordById]);

  const handleSelect = useCallback(
    (i) => {
      if (isAnswered || !question) return;
      setSelectedOption(i);
      setIsAnswered(true);
      const correct = i === question.correctIndex;
      setIsCorrect(correct);
      setAttempts((a) => a + 1);
      if (correct) {
        setStreak((s) => {
          const ns = s + 1;
          setBestStreak((b) => Math.max(b, ns));
          return ns;
        });
        setSolvedIds((ids) => [...ids, currentWordId]);
        setRemainingIds((ids) => ids.filter((id) => id !== currentWordId));
      } else {
        setStreak(0);
        setLives((l) => {
          const nl = l - 1;
          if (nl <= 0) setGameOver(true);
          return Math.max(nl, 0);
        });
      }
    },
    [isAnswered, question, currentWordId]
  );

  const handleContinue = useCallback(() => {
    if (remainingIds.length === 0) {
      setGameComplete(true);
    }
    setCurrentWordId(null);
    setQuestion(null);
    setIsAnswered(false);
    setSelectedOption(null);
    // Reset to the default progression mode for the next word
    setCurrentMode(defaultModeForIndex(spinOrder.length));
  }, [remainingIds, spinOrder]);

  const handleReset = useCallback(() => {
    setRemainingIds(dailyWords.map((w) => w.id));
    setSolvedIds([]);
    setSpinOrder([]);
    setCurrentMode("vocab");
    setCurrentWordId(null);
    setQuestion(null);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setLives(START_LIVES);
    setStreak(0);
    setBestStreak(0);
    setAttempts(0);
    setGameOver(false);
    setGameComplete(false);
    setJustLanded(false);
    spinningRef.current = false;
    setSpinning(false);
  }, [dailyWords]);

  const todayLabel = useMemo(
    () => new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }),
    []
  );

  const canSpin = !spinning && !currentWordId && remainingIds.length > 0 && !gameOver;

  return (
    <div
      className="min-h-full w-full flex flex-col items-center px-4 py-8 sm:px-8"
      style={{
        background: `radial-gradient(circle at 50% 0%, ${C.bg1} 0%, ${C.bg2} 55%, ${C.bg3} 100%)`,
        fontFamily: "'Inter', ui-sans-serif, system-ui",
        color: C.ink,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        @keyframes pulseGold { 0%,100% { box-shadow: 0 0 0 0 rgba(201,169,97,0.32);} 50% { box-shadow: 0 0 0 9px rgba(201,169,97,0);} }
        .pulse-gold { animation: pulseGold 2.4s ease-out infinite; }
        @keyframes popIn { from { opacity:0; transform: scale(0.9) translateY(6px);} to { opacity:1; transform: scale(1) translateY(0);} }
        .pop-in { animation: popIn 0.35s ease-out; }
        @keyframes flicker { 0%,100% { opacity: 1; } 50% { opacity: 0.8; } }
        .flame-live { animation: flicker 1.6s ease-in-out infinite; }
        @keyframes landFlash { 0% { box-shadow: 0 0 0 0 rgba(217,188,114,0); } 28% { box-shadow: 0 0 55px 14px rgba(217,188,114,0.55); } 100% { box-shadow: 0 0 0 0 rgba(217,188,114,0); } }
        .land-flash { animation: landFlash 1s ease-out; }
        @keyframes slowSpin { from { transform: translate(-50%,-50%) rotate(0deg);} to { transform: translate(-50%,-50%) rotate(360deg);} }
        .slow-ring { animation: slowSpin 22s linear infinite; }
        @keyframes twinkle { 0%,100% { opacity: 0.15; transform: scale(0.7);} 50% { opacity: 0.95; transform: scale(1.15);} }
        .twinkle { animation: twinkle 2.6s ease-in-out infinite; }
        @keyframes glowPulse { 0%,100% { opacity: 0.35;} 50% { opacity: 0.6;} }
        .wheel-glow { animation: glowPulse 4s ease-in-out infinite; }
      `}</style>

      {/* ---------- Header ---------- */}
      <div className="w-full max-w-5xl flex flex-col items-center text-center mb-6">
        <div className="font-mono text-xs tracking-[0.3em]" style={{ color: C.gold }}>
          TODAY&apos;S DECK · {todayLabel.toUpperCase()}
        </div>
        <h1 className="font-display text-4xl sm:text-5xl mt-2" style={{ color: C.ink }}>
          SAT Word Roulette
        </h1>
        <p className="mt-2 text-sm sm:text-base max-w-xl" style={{ color: C.inkDim }}>
          Spin the wheel, land on a word, answer before your luck runs out. Nine words a day, drawn from the
          top August SAT vocabulary.
        </p>
      </div>

      {/* ---------- Mode legend ---------- */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {Object.values(MODES).map((m) => {
          const active = currentMode === m.key;
          return (
            <button
              key={m.key}
              onClick={() => handleModeChange(m.key)}
              className="text-left rounded-xl px-4 py-3.5 border transition-colors"
              style={{
                borderColor: active ? C.gold : C.panelBorder,
                background: active ? C.goldSoft : "rgba(255,255,255,0.025)",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg" style={{ color: active ? C.goldBright : C.ink }}>
                  {m.label}
                </span>
                <span className="font-mono text-[10px] tracking-wider" style={{ color: C.inkFaint }}>
                  {m.tag}
                </span>
              </div>
              <p className="text-sm mt-1" style={{ color: C.inkDim }}>
                {m.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* ---------- Stats row ---------- */}
      <div className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-4 mb-8 rounded-xl px-4 py-3"
        style={{ background: C.panel, border: `1px solid ${C.panelBorder}` }}>
        <div className="flex items-center gap-2">
          {Array.from({ length: START_LIVES }).map((_, i) => (
            <Heart
              key={i}
              size={19}
              className={i < lives ? "flame-live" : ""}
              style={{ color: i < lives ? C.bad : "rgba(206,130,134,0.25)" }}
              fill={i < lives ? C.bad : "none"}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 font-mono text-sm">
          <Flame size={17} style={{ color: streak > 0 ? C.amber : "#4E5B52" }} />
          <span>{streak} streak</span>
          <span style={{ color: "#5B6B60" }}>· best {bestStreak}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {dailyWords.map((w) => {
            const solved = solvedIds.includes(w.id);
            return (
              <div
                key={w.id}
                title={solved ? w.word : "not yet learned"}
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{
                  background: solved ? C.gold : "rgba(237,231,217,0.08)",
                  border: solved ? "none" : `1px solid ${C.panelBorder}`,
                }}
              >
                {solved && <Check size={13} style={{ color: "#0B2318" }} strokeWidth={3} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------- Main area ---------- */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-10 items-center lg:items-start justify-center">
        {/* Wheel */}
        <div className="flex flex-col items-center gap-4 shrink-0">
          <div className="relative" style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}>
            {/* ambient glow */}
            <div
              className="absolute rounded-full wheel-glow"
              style={{
                inset: -26,
                filter: "blur(34px)",
                background:
                  "conic-gradient(from 0deg, hsl(150,45%,32%), hsl(242,40%,32%), hsl(335,45%,32%), hsl(150,45%,32%))",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />

            {/* twinkling sparkles */}
            {Array.from({ length: 8 }).map((_, i) => {
              const a = i * 45 * (Math.PI / 180);
              const r = WHEEL_SIZE / 2 + 14;
              const sx = r * Math.sin(a);
              const sy = -r * Math.cos(a);
              return (
                <div
                  key={i}
                  className="absolute rounded-full twinkle"
                  style={{
                    left: `calc(50% + ${sx}px)`,
                    top: `calc(50% + ${sy}px)`,
                    width: 4,
                    height: 4,
                    background: C.goldBright,
                    boxShadow: `0 0 6px 1px ${C.goldBright}`,
                    animationDelay: `${i * 0.32}s`,
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                />
              );
            })}

            {/* decorative slow-rotating ring */}
            <div
              className="absolute rounded-full slow-ring"
              style={{
                top: "50%",
                left: "50%",
                width: WHEEL_SIZE - 30,
                height: WHEEL_SIZE - 30,
                border: `1px dashed rgba(217,188,114,0.28)`,
                zIndex: 1,
                pointerEvents: "none",
              }}
            />

            {/* pointer — gold gem */}
            <div
              className="absolute left-1/2"
              style={{
                top: -6,
                width: 24,
                height: 24,
                transform: "translateX(-50%) rotate(45deg)",
                background: `linear-gradient(135deg, ${C.goldBright} 0%, ${C.gold} 55%, #8A6A2F 100%)`,
                border: "2px solid #0B2318",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5), 0 0 16px rgba(201,169,97,0.55)",
                zIndex: 21,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 3,
                  left: 3,
                  width: 6,
                  height: 6,
                  borderRadius: "9999px",
                  background: "rgba(255,255,255,0.75)",
                  filter: "blur(0.5px)",
                }}
              />
            </div>

            {/* the wheel */}
            <div
              className={`absolute inset-0 rounded-full ${justLanded ? "land-flash" : ""}`}
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: "transform 3s cubic-bezier(0.15,0.65,0.25,1)",
                background: [
                  "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.16), rgba(255,255,255,0) 55%)",
                  `repeating-conic-gradient(from 0deg, rgba(217,188,114,0.6) 0deg 0.6deg, transparent 0.6deg ${SEG_ANGLE}deg)`,
                  `conic-gradient(from 0deg, ${dailyWords
                    .map((w, i) => {
                      const c = segmentColor(i, dailyWords.length);
                      return `${c} ${i * SEG_ANGLE}deg ${(i + 1) * SEG_ANGLE}deg`;
                    })
                    .join(", ")})`,
                ].join(", "),
                border: `4px solid ${C.gold}`,
                boxShadow:
                  "0 0 0 1px rgba(0,0,0,0.4), 0 18px 40px rgba(0,0,0,0.55), inset 0 3px 8px rgba(255,255,255,0.12), inset 0 -12px 20px rgba(0,0,0,0.42)",
                zIndex: 2,
              }}
            >
              {dailyWords.map((w, i) => {
                const theta = i * SEG_ANGLE + SEG_ANGLE / 2;
                const rad = (theta * Math.PI) / 180;
                const x = RADIUS * Math.sin(rad);
                const y = -RADIUS * Math.cos(rad);
                const solved = solvedIds.includes(w.id);
                const hide = currentMode === "scenario" && (spinning || currentWordId !== null);
                const long = w.word.length > 9;
                return (
                  <div
                    key={w.id}
                    className="absolute flex flex-col items-center justify-center text-center"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
                      width: 76,
                      pointerEvents: "none",
                    }}
                  >
                    {solved ? (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(217,188,114,0.94)" }}
                      >
                        <Check size={14} style={{ color: "#0B2318" }} strokeWidth={3} />
                      </div>
                    ) : (
                      <span
                        className="leading-tight"
                        style={{
                          color: "#FBF8F0",
                          fontSize: long ? 12 : 13.5,
                          fontWeight: 600,
                          letterSpacing: "-0.1px",
                          fontFamily: "'Inter', ui-sans-serif, system-ui",
                          textShadow: "0 1px 3px rgba(0,0,0,0.9), 0 0 7px rgba(0,0,0,0.55)",
                        }}
                      >
                        {hide ? "· · · · ·" : w.word}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* hub */}
            <button
              onClick={handleSpin}
              disabled={!canSpin}
              className={`absolute rounded-full flex flex-col items-center justify-center ${
                canSpin ? "pulse-gold cursor-pointer" : "cursor-not-allowed"
              }`}
              style={{
                width: 92,
                height: 92,
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                background: canSpin
                  ? `linear-gradient(155deg, ${C.goldBright} 0%, ${C.gold} 55%, #A9843F 100%)`
                  : "rgba(201,169,97,0.30)",
                border: "3px solid #0B2318",
                boxShadow: canSpin
                  ? "inset 0 2px 4px rgba(255,255,255,0.35), inset 0 -3px 6px rgba(0,0,0,0.25), 0 6px 14px rgba(0,0,0,0.4)"
                  : "none",
                zIndex: 10,
              }}
            >
              <RotateCw
                size={23}
                style={{ color: "#0B2318" }}
                className={spinning ? "animate-spin" : ""}
              />
              <span className="font-mono text-[10px] font-semibold mt-1" style={{ color: "#0B2318" }}>
                {spinning ? "..." : "SPIN"}
              </span>
            </button>
          </div>
          <p className="font-mono text-sm" style={{ color: C.inkFaint }}>
            {remainingIds.length} word{remainingIds.length === 1 ? "" : "s"} left on the wheel
          </p>
        </div>

        {/* Question panel */}
        <div
          className="w-full max-w-lg rounded-2xl p-6 min-h-[360px] flex flex-col"
          style={{ background: C.panel, border: `1px solid ${C.panelBorder}` }}
        >
          {!currentWordId && !gameOver && !gameComplete && (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-3" style={{ color: C.inkDim }}>
              <Sparkles size={28} style={{ color: C.gold }} />
              <p className="font-display text-xl" style={{ color: C.ink }}>
                Spin the wheel to get your next word
              </p>
              <p className="text-base max-w-xs">
                Currently set to <strong style={{ color: C.goldBright }}>{MODES[currentMode].label}</strong> mode
                — switch above any time.
              </p>
            </div>
          )}

          {gameComplete && (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 pop-in">
              <Trophy size={36} style={{ color: C.gold }} />
              <p className="font-display text-2xl" style={{ color: C.ink }}>
                Daily deck complete!
              </p>
              <p className="text-base" style={{ color: C.inkDim }}>
                All 9 words learned · best streak {bestStreak} · {attempts} attempt{attempts === 1 ? "" : "s"} today
              </p>
              <button
                onClick={handleReset}
                className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs font-semibold"
                style={{ background: C.gold, color: "#0B2318" }}
              >
                <RefreshCcw size={14} /> Play again
              </button>
            </div>
          )}

          {gameOver && !gameComplete && (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 pop-in">
              <X size={36} style={{ color: C.bad }} />
              <p className="font-display text-2xl" style={{ color: C.ink }}>
                Out of lives
              </p>
              <p className="text-base" style={{ color: C.inkDim }}>
                {solvedIds.length} of 9 words learned · best streak {bestStreak}
              </p>
              <button
                onClick={handleReset}
                className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs font-semibold"
                style={{ background: C.gold, color: "#0B2318" }}
              >
                <RefreshCcw size={14} /> Try again
              </button>
            </div>
          )}

          {currentWordId && question && !gameOver && (
            <div className="flex flex-col flex-1 pop-in">
              <div className="flex items-center justify-between mb-4">
                <span
                  className="font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-full"
                  style={{ background: C.goldSoft, color: C.goldBright }}
                >
                  {MODES[question.mode].label.toUpperCase()}
                </span>
                <span className="font-mono text-[10px]" style={{ color: C.inkFaint }}>
                  {spinOrder.indexOf(currentWordId) + 1} / 9 seen
                </span>
              </div>

              <div className="mb-5">
                {question.mode === "vocab" && (
                  <p className="font-display text-4xl text-center py-4" style={{ color: C.ink }}>
                    {question.prompt.word}
                  </p>
                )}
                {question.mode === "meaning" && (
                  <p className="text-xl leading-relaxed text-center" style={{ color: C.ink }}>
                    {question.prompt.before}
                    <span style={{ textDecoration: "underline", textDecorationColor: C.gold, textUnderlineOffset: "4px", fontWeight: 600 }}>
                      {question.prompt.match}
                    </span>
                    {question.prompt.after}
                  </p>
                )}
                {question.mode === "scenario" && (
                  <p className="text-xl leading-relaxed text-center" style={{ color: C.ink }}>
                    {question.prompt.before}
                    <span
                      className="font-mono"
                      style={{ borderBottom: `2px solid ${C.gold}`, padding: "0 4px", color: C.goldBright }}
                    >
                      _____
                    </span>
                    {question.prompt.after}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2.5">
                {question.options.map((opt, i) => {
                  let bg = "rgba(255,255,255,0.035)";
                  let border = C.panelBorder;
                  let textColor = C.ink;
                  if (isAnswered) {
                    if (i === question.correctIndex) {
                      bg = "rgba(127,196,154,0.14)";
                      border = C.good;
                      textColor = C.good;
                    } else if (i === selectedOption) {
                      bg = "rgba(206,130,134,0.14)";
                      border = C.bad;
                      textColor = C.bad;
                    }
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      disabled={isAnswered}
                      className="text-left px-4 py-3.5 rounded-xl border text-base transition-colors flex items-center justify-between gap-2"
                      style={{ background: bg, borderColor: border, color: textColor }}
                    >
                      <span>{opt.text}</span>
                      {isAnswered && i === question.correctIndex && <Check size={16} />}
                      {isAnswered && i === selectedOption && i !== question.correctIndex && <X size={16} />}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="mt-4 flex flex-col gap-2">
                  {question.mode === "scenario" && (
                    <p className="text-sm px-1" style={{ color: C.inkDim }}>
                      <span style={{ color: C.goldBright, fontWeight: 600 }}>
                        {wordById[currentWordId]?.word}
                      </span>
                      {" — "}
                      {wordById[currentWordId]?.definition}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color: isCorrect ? C.good : C.bad }}>
                      {isCorrect ? "Correct — word learned!" : lives > 0 ? "Not quite — word stays on the wheel." : ""}
                    </span>
                    {!gameOver && (
                      <button
                        onClick={handleContinue}
                        className="px-4 py-2 rounded-full font-mono text-xs font-semibold"
                        style={{ background: C.gold, color: "#0B2318" }}
                      >
                        Continue
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-5xl mt-8 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-xs" style={{ color: C.inkFaint }}>
          <Info size={14} />
          Wrong answers stay on the wheel until you get them right — in any mode.
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono"
          style={{ border: `1px solid ${C.panelBorder}`, color: C.inkDim }}
        >
          <RefreshCcw size={12} /> Reset deck
        </button>
      </div>
    </div>
  );
}
