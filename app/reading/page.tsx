"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ReadingPage() {
  const [lang, setLang] = useState<"pashto" | "sindhi">("pashto");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <Button
          variant={lang === "pashto" ? "default" : "primaryOutline"}
          onClick={() => setLang("pashto")}
        >
          Pashto
        </Button>
        <Button
          variant={lang === "sindhi" ? "default" : "primaryOutline"}
          onClick={() => setLang("sindhi")}
        >
          Sindhi
        </Button>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900">Reading comprehension</h2>
      </div>

      {lang === "pashto" && (
        <article className="bg-white rounded-xl shadow p-6">
          <header className="flex items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-[240px]">
              <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 mb-1">Pashto (پښتو)</h1>
              <p className="text-neutral-600">Eastern Iranian language of Afghanistan and Pakistan</p>
            </div>
            <aside className="w-full md:w-[320px] md:ml-auto bg-blue-50 rounded-lg border border-blue-100">
              <div className="p-4 border-b border-blue-100">
                <h2 className="text-lg font-bold text-blue-800">Pashto — Quick Facts</h2>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <img src="/pashtoflag.png" alt="Pashto regions" className="h-10 w-10 object-contain"/>
                  <div>
                    <div className="font-semibold">Region</div>
                    <div className="text-neutral-700">Afghanistan, Pakistan</div>
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Language family</div>
                  <div className="text-neutral-700">Indo‑European → Iranian → Eastern Iranian</div>
                </div>
                <div>
                  <div className="font-semibold">Writing system</div>
                  <div className="text-neutral-700">Arabic‑based Pashto alphabet</div>
                </div>
                <div>
                  <div className="font-semibold">Dialects</div>
                  <div className="text-neutral-700">Southern (Kandahari), Northern (Yusufzai), others</div>
                </div>
                <div>
                  <a className="text-blue-700 underline" href="https://en.wikipedia.org/wiki/Pashto" target="_blank" rel="noreferrer">Source: Wikipedia</a>
                </div>
              </div>
            </aside>
          </header>
          <section className="mt-4 space-y-4 leading-7 text-neutral-800">
            <p>
              Pashto is an Eastern Iranian language spoken primarily in Afghanistan and Pakistan. It is written using a modified Arabic script and
              possesses a rich literary heritage of poetry, proverbs, and folk literature. Modern Pashto spans media, education, and literature,
              and includes multiple regional dialects.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-50 rounded-lg p-4 border">
                <h3 className="font-semibold mb-2">Phonology (high‑level)</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr>
                      <td className="py-1 font-medium">Vowels</td>
                      <td className="py-1">Front, Central, Back; short/long contrasts</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium">Consonants</td>
                      <td className="py-1">Stops, fricatives, affricates; retroflex series common</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-neutral-50 rounded-lg p-4 border">
                <h3 className="font-semibold mb-2">Grammar (high‑level)</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>SOV (subject‑object‑verb) word order</li>
                  <li>Noun/adjective agreement; case marking</li>
                  <li>Verbal aspect and tense distinctions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Extended Reading provided by user */}
          <section className="mt-6 space-y-4 leading-7 text-neutral-800">
            <h2 className="text-2xl font-bold">Extended Reading</h2>
            <p>
              Pashto is an eastern Iranian language in the Indo‑European language family, natively spoken in northwestern Pakistan and southern and eastern Afghanistan. It has official status in Afghanistan. It is known in historical Persian literature as Afghani (افغانی, Afghāni).
            </p>
            <p>
              Spoken as a native language mostly by ethnic Pashtuns, it is one of the two official languages of Afghanistan alongside Dari, and it is spoken as the second‑largest provincial language in Pakistan, spoken mainly in Khyber Pakhtunkhwa and the northern districts of Balochistan. Likewise, it is the primary language of the Pashtun diaspora around the world. The total number of Pashto‑speakers is at least 40 million, although some estimates place it as high as 60 million. Pashto is "one of the primary markers of ethnic identity" amongst Pashtuns.
            </p>
            <h3 className="text-xl font-semibold">Geographic distribution</h3>
            <p>
              A national language of Afghanistan, Pashto is primarily spoken in the east, south, and southwest, but also in some northern and western parts of the country. The exact number of speakers is unavailable, but different estimates show that Pashto is the mother tongue of 45–60% of the total population of Afghanistan.
            </p>
            <p>
              In Pakistan, Pashto is spoken by 18.1% of its population, mainly in the northwestern province of Khyber Pakhtunkhwa and northern districts of Balochistan province. It is also spoken in parts of Mianwali and Attock districts of the Punjab province, areas of Gilgit‑Baltistan and in Islamabad. Pashto speakers are found in other major cities of Pakistan, most notably Karachi, Sindh, which may have the largest Pashtun population of any city in the world.
            </p>
            <p>
              Other communities of Pashto speakers are found in India, Tajikistan, and northeastern Iran (primarily in South Khorasan Province near the Afghan border). In India most ethnic Pashtun (Pathan) peoples speak the geographically native Hindi‑Urdu language rather than Pashto, but there are small numbers of Pashto speakers, such as the Sheen Khalai in Rajasthan, and the Pathan community in Kolkata (Kabuliwala). Significant diaspora communities exist in the United Arab Emirates and Saudi Arabia.
            </p>
            <h3 className="text-xl font-semibold">Pakistan</h3>
            <p>
              In British India, prior to the creation of Pakistan, the 1920s saw the blossoming of Pashto language in the then NWFP: Abdul Ghafar Khan in 1921 established the Anjuman‑e‑Islah al‑Afaghina to promote Pashto; around 80,000 people attended the Society's annual meeting in 1927. In 1955, Pashtun intellectuals including Abdul Qadir formed the Pashto Academy Peshawar on the model of Pashto Tolana formed in Afghanistan. In 1974, the Department of Pashto was established in the University of Balochistan for the promotion of Pashto.
            </p>
            <p>
              In Pakistan, Pashto is the first language of around 18.1% of its population (2023 census). However, Urdu and English are the two official languages of Pakistan. Pashto has no official status at the federal level. On a provincial level, Pashto is the regional language of Khyber Pakhtunkhwa and north Balochistan. Yet, the primary medium of education in government schools in Pakistan is Urdu. Researchers have observed that Pashtun students are often unable to fully comprehend educational material in Urdu, and Pashto is taught inconsistently across dialect‑rich regions.
            </p>
            <blockquote className="border-l-4 border-neutral-300 pl-4 italic text-neutral-700">
              "The government of Pakistan, faced with irredentist claims from Afghanistan on its territory, also discouraged the Pashto Movement and eventually allowed its use in peripheral domains only after the Pakhtun elite had been co‑opted by the ruling elite... Thus, even though there is still an active desire among some Pakhtun activists to use Pashto in the domains of power, it is more of a symbol of Pakhtun identity than one of nationalism." — Tariq Rahman
            </blockquote>
            <blockquote className="border-l-4 border-neutral-300 pl-4 italic text-neutral-700">
              "In the end, national language policy, especially in the field of education in the NWFP, had constructed a type of three tiered language hierarchy. Pashto lagged far behind Urdu and English in prestige or development in almost every domain of political or economic power..." — Robert Nicols
            </blockquote>
            <h3 className="text-xl font-semibold">History</h3>
            <p>
              Some linguists have argued that Pashto is descended from Avestan or a closely related variety, while others place it nearer to Bactrian. Scholars agree Pashto is an Eastern Iranian language sharing characteristics with Eastern Middle Iranian languages such as Bactrian, Khwarezmian and Sogdian. Classical sources like Strabo mention tribes west of the Indus as part of Ariana during the Greco‑Bactrian period. From the 3rd century CE onward, Pashtuns are often referred to as Afghan (Abgan).
            </p>
            <p>
              The earliest modern Pashto work is often attributed (controversially) to Amir Kror Suri in the 8th century (Pə́ṭa Xazāná), though its authenticity is disputed. From the 16th century onward, Pashto poetry flourished with figures like Bayazid Pir Roshan, Khushal Khan Khattak, Rahman Baba, Nazo Tokhi, and Ahmad Shah Durrani, who used poetry for cultural identity and political unity.
            </p>
          </section>
        </article>
      )}

      {lang === "sindhi" && (
        <article className="bg-white rounded-xl shadow p-6">
          <header className="flex items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-[240px]">
              <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 mb-1">Sindhi (سنڌي / सिन्धी)</h1>
              <p className="text-neutral-600">Indo‑Aryan language native to Sindh</p>
            </div>
            <aside className="w-full md:w-[320px] md:ml-auto bg-blue-50 rounded-lg border border-blue-100">
              <div className="p-4 border-b border-blue-100">
                <h2 className="text-lg font-bold text-blue-800">Sindhi — Quick Facts</h2>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <img src="/sindhiflag.png" alt="Sindhi regions" className="h-10 w-10 object-contain"/>
                  <div>
                    <div className="font-semibold">Region</div>
                    <div className="text-neutral-700">Sindh (Pakistan), parts of India</div>
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Language family</div>
                  <div className="text-neutral-700">Indo‑European → Indo‑Aryan</div>
                </div>
                <div>
                  <div className="font-semibold">Writing systems</div>
                  <div className="text-neutral-700">Perso‑Arabic, Devanagari; historical Laṇḍā scripts</div>
                </div>
                <div>
                  <div className="font-semibold">Dialects</div>
                  <div className="text-neutral-700">Multiple regional varieties across Sindh/India</div>
                </div>
                <div>
                  <a className="text-blue-700 underline" href="https://en.wikipedia.org/wiki/Sindhi_language" target="_blank" rel="noreferrer">Source: Wikipedia</a>
                </div>
              </div>
            </aside>
          </header>
          <section className="mt-4 space-y-4 leading-7 text-neutral-800">
            <p>
              Sindhi is an Indo‑Aryan language spoken by more than 30 million people in Sindh (Pakistan), where it has official status, and by about 1.7 million in India where it is a scheduled language without state‑level official status. In Pakistan it is primarily written in the Perso‑Arabic script; in India both Perso‑Arabic and Devanagari are used.
            </p>
            <p>
              Sindhi is a Northwestern Indo‑Aryan language related to (but not mutually intelligible with) Saraiki and Punjabi, and it has several regional dialects. It is an inflected language with five cases for nouns, rich pronominal systems, two genders and two numbers. Its core vocabulary derives from Sanskrit via Prakrit and Apabhraṃśa, with substantial high‑register loanwords from Persian and Arabic, and more recent loans from English (and to a lesser extent Portuguese/French). It has had contact influence with Saraiki, Punjabi, Balochi, Brahui, Gujarati, and Marwari.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-50 rounded-lg p-4 border">
                <h3 className="font-semibold mb-2">Writing Systems</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr>
                      <td className="py-1 font-medium">Primary</td>
                      <td className="py-1">Perso‑Arabic (Pakistan), Devanagari (India)</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium">Historical</td>
                      <td className="py-1">Laṇḍā scripts: Khudabadi, Khojki, Gurmukhi (contexts)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-neutral-50 rounded-lg p-4 border">
                <h3 className="font-semibold mb-2">Grammar (high‑level)</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Five cases (nouns); rich pronoun paradigms</li>
                  <li>Two genders (masc./fem.), two numbers (sg./pl.)</li>
                  <li>Postpositions and case markers; SOV order</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Extended Reading provided by user */}
          <section className="mt-6 space-y-4 leading-7 text-neutral-800">
            <h2 className="text-2xl font-bold">Extended Reading</h2>
            <p>
              The earliest written evidence of modern Sindhi can be found in a Qur’an translation dated to 883 AD. Following the Umayyad conquest of Sindh (712 AD), Sindhi was among the first Indo‑Aryan languages to experience substantial Persian and Arabic influence. A significant body of Sindhi literature developed in the Medieval period, notably the religious and mystic poetry of Shah Abdul Latif Bhittai (18th century). Modern Sindhi was promoted under British rule after 1843, shaping its post‑1947 status in Pakistan.
            </p>
            <p>
              Standard Sindhi is based on the prestige dialect around Hyderabad (Vicholi). Other dialects include Uttaradi (north Sindh), Lari (south Sindh), Siroli (north‑most; sometimes transitional with Saraiki), Lasi (Lasbela/Hub/Gwadar; in contact with Balochi), Firaqi (Kachhi plains in NE Balochistan), Thareli (Thar/adjacent Rajasthan), and Sindhi Bhili. The Sindhi Language Authority (Govt. of Sindh) regulates development and promotion of the language.
            </p>
            <h3 className="text-xl font-semibold">History — Origins</h3>
            <p>
              The name “Sindhi” derives from Sanskrit <em>síndhu</em> (the Indus River). Like other Indo‑Aryan languages, Sindhi descends from Old Indo‑Aryan (Sanskrit) via Middle Indo‑Aryan (Pali, Prakrits, Apabhraṃśa). Proposed specific descent from the Vrācaḍa Apabhraṃśa dialect remains debated. Distinctive New Indo‑Aryan sound changes include development of implosives (e.g., g‑, ‑gg &gt; ɠ), shortening of geminates, voicing after nasals, debuccalization of intervocalic ‑s‑ &gt; ‑h‑ (shared with Saraiki/Punjabi varieties), and various retroflexion processes.
            </p>
            <p>
              Early attestations include references by Arabic geographers (al‑Masudi, Ibn Hawqal) noting a distinct “language of Sind.” Buddhist monk Hyech’o also remarks on Sindh’s distinct speech in the early 8th century. Medieval literature features Sufi and Advaita‑influenced poetry (bayt form), romantic epics (e.g., <em>Sassui Punnhun</em>, <em>Sohni Mahiwal</em>, <em>Momal Rano</em>), and culminates in the works of Shah Abdul Latif Bhittai (<em>Shah Jo Risalo</em>).
            </p>
            <h3 className="text-xl font-semibold">British India → Modern Era</h3>
            <p>
              Under British administration, Sindhi gained official status (orders by Sir Bartle Frere, 1857) and saw script reforms (debates around Khudabadi). Printing in Sindhi expanded from 1867. After 1947, most Sindhi speakers were within Pakistan, and distinct literary trajectories emerged in Pakistan and India (greater Urdu influence in the former, Hindi in the latter). Today, Sindhi remains official in Sindh (Pakistan) and a scheduled language in India, with strong institutional support and a broad dialect continuum.
            </p>
          </section>
        </article>
      )}

      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-3">Comprehension Practice</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Questions (Pashto)</h3>
            <ol className="list-decimal pl-6 text-neutral-808 space-y-2 text-sm">
              <li>What language family and branch does Pashto belong to?</li>
              <li>Which writing system does Pashto use?</li>
              <li>Name one major Pashto dialect.</li>
              <li>Where is Pashto primarily spoken?</li>
            </ol>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Questions (Sindhi)</h3>
            <ol className="list-decimal pl-6 text-neutral-800 space-y-2 text-sm">
              <li>Summarize Sindhi’s scripts, both primary and historical.</li>
              <li>Describe two distinctive sound changes in Sindhi’s development.</li>
              <li>Who is considered the greatest poet of Sindhi and what is the major compilation?</li>
              <li>Which dialect forms the basis for Standard Sindhi?</li>
            </ol>
          </div>
        </div>
        <p className="text-xs text-neutral-500 mt-4">
          References: <a className="underline text-blue-700" href="https://en.wikipedia.org/wiki/Pashto" target="_blank" rel="noreferrer">Pashto</a>, <a className="underline text-blue-700" href="https://en.wikipedia.org/wiki/Sindhi_language" target="_blank" rel="noreferrer">Sindhi language</a>
        </p>
      </section>
    </div>
  );
}
