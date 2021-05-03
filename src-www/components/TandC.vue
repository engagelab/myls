<template>
  <div>
    <div v-if="$i18n.locale === 'no'">
      <h1>Informert samtykke</h1>
      <h1>
        Prosjekttittel: Læring med internett. En studie om studentenes læring
        med nettbaserte læringsressurser og digitale verktøy
      </h1>
      <p>Takk for at du deltar i prosjektet 'Læring med internett’.</p>

      <h2>Formålet med prosjektet</h2>
      <p>
        Dette prosjektets mål er å forstå hvordan spesialiserte, nettbaserte
        ressurser som er tilgjengelig på Internett blir en del av
        læringsprosessen til studenter i data- og programvareingeniørprogrammer.
        Tre forskningsspørsmål vil bli spurt om:
      </p>
      <ul>
        <li>
          a) Hvilke domenespesifikke aktiviteter og nettbaserte ressurser, som
          involverer Internett, er vanlige blant studentene under studiene?
        </li>
        <li>
          b) Hvordan varierer studenters tidsbruk når de bruker disse ressursene
          læringsformål?
        </li>
        <li>
          c) Hvordan påvirker bruken av disse nettbaserte ressursene,
          læringsaktiviteter og oppgaver som er en del av den vanlige
          læreplanen?
        </li>
      </ul>

      <h2>Hvem er ansvarlig for forskningsprosjektet?</h2>
      <p>
        Universitetet i Oslo, Utdanningsetaten er institusjonen som er ansvarlig
        for prosjektet.
      </p>

      <h2>Hvorfor blir du bedt om å delta?</h2>
      <p>
        Studien inkluderer studenter som er en del av data- og
        programvareingeniørprogrammet, og kurset ditt har blitt valgt som case
        for å undersøke bruken av nettbaserte ressurser som er relatert til
        studiene dine.
      </p>

      <h2>Hva innebærer deltakelse for deg?</h2>
      <p>
        Hvis du velger å delta i prosjektet, vil dette innebære å installere en
        Google Browser Extension på din datamaskin, der du vil svare på en
        undersøkelse som vil vare maksimalt 15 minutter, og delta i et intervju.
      </p>
      <p>
        Undersøkelsen vil innebære å svare på spørsmål om å lære å programmere
        og andre programvareutviklingsrelaterte aktiviteter, nettstedene du
        bruker til å utføre dem, og gi tilgang til nettleserloggen bare av de
        spesifikke nettstedene du rapporterer å bruke under denne undersøkelsen.
        Intervjuet vil vare i maksimalt 1 time, inkludert spørsmål om målene for
        å utføre disse aktivitetene på Internett, utfordringene du har når du
        utfører disse aktivitetene, og hvordan de påvirker studiene dine.
        Intervjuet vil bli tatt opp lyd. Alle svarene dine vil bli anonymisert
        etter at datainnsamlingsprosessen er fullført.
      </p>

      <h2>
        Hvor lang tid vil innsamlingen av informasjon fra undersøkelsen og
        nettstedene du rapporterer du bruker ta?
      </h2>
      <p>
        Du får 3 uker fra det øyeblikket du inviteres til å delta i studien for
        å installere Google Chrome Extension til å svare på undersøkelsen.
      </p>

      <h2>Må du logges til enhver tid i løpet av datainnsamlingsperioden?</h2>
      <p>
        Nei, det er bare nødvendig for Extension som skal installeres i løpet av
        tiden du vil svare på undersøkelsen. Du kan melde deg ut når som helst
        før du sender inn undersøkelsen. Du kan avinstallere Google Chrome
        Extension når du har sendt inn undersøkelsen.
      </p>

      <h2>
        Når blir informasjonen fra undersøkelsen og nettstedene du rapporterer
        at du bruker registrert?
      </h2>
      <p>
        Datainnsamlingen av både evalueringssvar og nettleserloggdata finner
        sted bare i det øyeblikket undersøkelsen sendes inn i Google Chrome
        Extension. Det vil ikke være noen datainnsamling utenfor denne
        tidsrammen. Dette betyr at selv om Google Chrome Extension er installert
        på forhånd, samler den bare inn data i det øyeblikket du sender inn
        undersøkelsen.
      </p>

      <h2>Hva skjer hvis du avinstallerer Google Chrome Extension?</h2>
      <p>
        Hvis du avinstallerer Google Chrome Extension uten å sende inn
        undersøkelsen, samles det ingen data inn. Hvis du avinstallerer
        Extension etter at undersøkelsen er sendt inn, forblir de innsamlede
        dataene lagret sikkert på en lokal, sikret UiO-server.
      </p>

      <h2>
        Hvordan mottar vi informasjonen fra undersøkelsen og nettstedene du
        rapporterer du bruker?
      </h2>
      <p>
        Utvidelsen samler inn data ved hjelp av chrome.history API og filtrerer
        bare de nettstedene du rapporterer å ha brukt under undersøkelsen.
        Informasjonen vil kun bli behandlet og lagret og direkte på en sikker
        lokal UiO-server.
      </p>

      <h2>
        Hvilken informasjon registreres fra nettstedene du oppgir at du har
        brukt?
      </h2>
      <p>
        Når du har sendt inn svarene dine på undersøkelsen i Google Chrome
        Extension som rapporterer nettstedene du bruker til å lære å programmere
        og andre programvareutviklingsrelaterte aktiviteter, registrerer
        Extension informasjon fra nettleserloggen din de siste 90 dagene. Dette
        skjer fra det øyeblikket du sender inn undersøkelsen, bare av de
        nettstedene du rapporterer du bruker. Informasjonen som samles inn for
        hvert nettsted tilsvarer:
      </p>
      <ul class="list-disc">
        <li>Totalt antall besøk.</li>
        <li>Datoer og klokkeslett for hvert besøk.</li>
        <li>URL-adressen til hvert besøk</li>
        <li>
          Måten brukeren fikk tilgang til det bestemte nettstedet hvert besøk
          (klikke på en kobling på en annen side, skrive inn NETTADRESSEN,
          klikke en bokmerket kobling, blant andre alternativer).
        </li>
        <li>Tittelen på nettstedet.</li>
      </ul>

      <h2>Deltakelse er frivillig</h2>
      <p>
        Din deltakelse i prosjektet er frivillig. Hvis du velger å delta, kan du
        trekke tilbake samtykket ditt når som helst uten å oppgi grunn. All
        informasjon om deg vil da bli anonym. Det vil ikke være noen negative
        konsekvenser for deg hvis du velger å ikke delta eller senere bestemmer
        deg for å trekke deg tilbake.
      </p>

      <h2>
        Ditt personlige personvern – hvordan vi skal lagre og bruke
        personopplysningene dine
      </h2>
      <p>
        Vi vil kun bruke personopplysningene dine til det formål(e) som er
        angitt i dette informasjonsbrevet. Vi vil behandle personopplysningene
        dine i samsvar med personvernlovgivningen (Personvernforordningen og
        personopplysningsloven).
      </p>
      <p>
        Bare ph.d.-kandidaten og veilederen vil ha tilgang til
        personopplysningene. Ditt navn og kontaktinformasjon vil bli erstattet
        med en kode. Listen over navn, kontaktdetaljer og respektive koder
        lagres separat fra resten av de innsamlede dataene. Dataene vil bli
        lagret i kryptert eksternt skrivebord ved Universitetet i Oslo.
      </p>

      <h2>
        Hva vil skje med dine personopplysninger på slutten av
        forskningsprosjektet?
      </h2>
      <p>
        Studien knyttet til ph.d.-prosjektet er planlagt å avsluttes i august
        2023; datainnsamlingsprosessen er planlagt å avsluttes i april 2021.
        Personopplysningene, inkludert eventuelle digitale opptak, vil bli
        anonymisert på det tidspunktet.
      </p>

      <h2>Dine rettigheter</h2>
      <p>
        Så lenge du kan identifiseres i de innsamlede dataene, har du rett til
        å:
      </p>
      <ul class="list-disc">
        <li>få tilgang til personopplysningene som behandles om deg</li>
        <li>be om at personopplysningene dine slettes</li>
        <li>be om at feil personopplysninger om deg er korrigert/utbedret</li>
        <li>motta en kopi av dine personopplysninger (dataportabilitet), og</li>
        <li>
          sende en klage til personvernombudet eller Datatilsynet om behandling
          av dine personopplysninger
        </li>
      </ul>

      <h2>Hva gir oss rett til å behandle personopplysningene dine?</h2>
      <p>
        Vi vil behandle dine personopplysninger basert på ditt samtykke. Basert
        på en avtale med Universitetet i Oslo har NSD – Norsk senter for
        forskningsdata AS vurdert at behandlingen av personopplysninger i dette
        prosjektet er i samsvar med personvernlovgivningen.
      </p>

      <h2>Hvor kan jeg finne ut mer?</h2>
      <p>
        Hvis du har spørsmål om prosjektet, eller ønsker å vite mer om dine
        rettigheter, kontakt:
      </p>
      <ul>
        <li>
          Universitetet i Oslo via Andrés Araos, via e-post:
          a.a.a.moya@iped.uio.no, a.a.a.moya@iped.uio.no eller veileder Crina
          Damsa, via e-post: crina.damsa@iped.uio.no
        </li>
        <li>
          Vår personvernombud: Maren Magnus Voll, via e-post:
          personvernombud@uio.no
        </li>
        <li>
          NSD – Norsk Senter for forskningsdata AS, via e-post:
          (personverntjenester@nsd.no) eller på telefon: +47 55 58 21 17.
        </li>
      </ul>
      <p>
        Vennlig hilsen,
        <br />Stipendiat: Andrés Arturo Araos Moya
      </p>
    </div>

    <div v-else-if="$i18n.locale === 'en'">
      <h1>Information Australian Authorities</h1>
      <h2>EXPLANATORY STATEMENT – Participant in the study</h2>
      <h2>Project title:</h2>
      <p>Learning with the internet. A mixed-methods study to
        explore undergraduate students’ learning with non-curricular resources
        and digital tools
      </p>
      <h2>Chief Investigator:</h2>
      <p>Professor Dragan Gašević,
        Faculty of Information Technology,
        dragan.gasevic@monash.edu, (03) 9905 5200
      </p>
      <br />
      <p>
        You are invited to take part in this study. Please read this Explanatory Statement in full before deciding whether or not to participate in this research.
        If you would like further information regarding any aspect of this project, you are encouraged to contact Mladen Raković, Study Coordinator (mladen.rakovic@monash.edu).
      </p>
      <br />
      <h2>What does the research involve?</h2>
      <p>
        This project’s aim is to understand how specialized resources available on the Internet become part of the learning process of students in computer and software engineering programs.
        The study takes place virtually, and involves answering an online survey and participating in an interview.
      </p>
      <h2>Why were you chosen for this research?</h2>
      <p>
        You expressed your interest to participate in this research following the link provided in the advertisement flyer.
        At that point, you also provided your contact details to the research team.
      </p>
      <h2>Procedure</h2>
      <p>
        If you choose to take part in the project, this will involve installing a Google Browser Extension in your personal computer,
        in which you will answer a survey that will last maximum 10 minutes, and taking part in an interview. The survey will involve answering
        questions about learning to program and other software development related activities, the websites you use to carry them out,
        and granting access to the browsing history only of those specific websites you report to use during the survey.
        The Extension will register information from the last 90 days of web browsing history from the moment you submit the survey, only of those websites you report you use.
        You will be asked to uninstall the extension once you have submitted the survey. The information collected for each website corresponds to:
      </p>
      <ul>
        <li>Total number of visits</li>
        <li>The date and time of each visit</li>
        <li>The type of mechanism used to access the particular website on each visit (e.g. clicking a link on another page, typing the URL, clicking a bookmarked link)</li>
      </ul>
      <p>
        The interview will last maximum 60 minutes including questions about the goals of carrying out these activities on the Internet and their value for learning,
        the challenges carrying out these activities suppose for you, and their relation with your studies. The interview will be audio recorded.
      </p>
      <h2>Consenting to participate in the study and withdrawing from the research</h2>
      <p>
        Participation in this study is entirely voluntary. After reading the Explanatory Statement, you will be presented with the Consent Form if you wish to proceed and confirm your participation.
        Your decision of whether or not to participate will not affect your current or future relations with Monash University.
        If you are a student, a decision to participate, or to withdraw your participation, will not affect you academically in any way.
        If you decide to withdraw at any point in the study, you will still be offered a full incentive for participation (described in the Payment section below).
      </p>
      <h2>Risks and Benefits</h2>
      <p>
        There are no risks associated with participating in this study. The study will also provide students with feedback that will help them improve their
        usage of online resources to learn software development. In addition, we hope to learn more about how non-curricular online resources provide support for student learning,
        and to contribute to improving teaching practice in the future.
      </p>
      <h2>Payment</h2>
      <p>
        You will eligible for receiving a $30 gift card as an incentive for participating in the study that will be given away in a lottery among all the participants.
      </p>
      <h2>Confidentiality</h2>
      <p>
        All information collected in the study is confidential within the limits allowed by law, and your name will not be identified at any time.
        A numeric code will be used as identification on data collection materials (i.e., data will be anonymized).
        Once data are collected, this code will be used for maintenance and analysis of data. There is no way for anyone to connect your responses to your identity.
        Pseudonyms will be used in publications and conference papers. Your data will be pooled and analysed all together with data collected from students outside Monash University and Australia,
        and the abovementioned numeric code will be used in this analysis as identification (i.e., data will be anonymized) and your personal information will remain completely anonymous.
      </p>
      <h2>Storage of Data</h2>
      <p>
        All data captured will be in electronic format and will be stored on a secure cloud server. All data will be kept for at least five years as per Monash University policy.
        After this time, the data will be destroyed. Findings from this study will be reported only as statements or suggestions in a way that prevents identification of any individual participant.
      </p>
      <h2>Use of data for other purposes</h2>
      <p>
        The collected data may be used in follow-up research (subject to ethics approval) and made available to other researchers for further analysis and for verification of the
        conclusions reached by the research team. However, any personal information will not be shared with anyone else.
      </p>
      <h2>Results</h2>
      <p>
        Upon the completion of this research, results will be made available to participants upon request (contact the Study Coordinator listed above).
        Results may be published in a conference paper and/or journal article and/or included in the PhD thesis of the student Richard Osakwe.
        Published results will be in totally de-identified summary form.
      </p>
      <h2>Freedom to Withdraw and Ask Questions</h2>
      <p>
        Participation is voluntary and you are free to ask questions and/or to withdraw from participation at any time without penalty or loss of benefits to which you are otherwise entitled.
        You also have the right to refuse to answer any question. The data collection process is scheduled to end 1st of July 2021.
        The personal data, including any digital recordings will be completely anonymized at that time.
        Withdrawal from the study will not be possible once the data is anonymized, as it will not be possible to identify the student’s identity within the data.
      </p>
      <h2>
        Your personal privacy – how we will store and use your personal data
      </h2>
      <p>
        We will only use your personal data for the purpose(s) specified in this
        information letter. We will process your personal data confidentiality
        and in accordance with data protection legislation (the General Data
        Protection Regulation and Personal Data Act).
      </p>
      <p>
        Only the PhD candidate and the supervisor will have access to the
        personal data. Your name and contact details will be replaced with a
        code. The list of names, contact details and respective codes will be
        stored separately from the rest of the collected data. The data will be
        stored in encrypted remote desktop of University of Oslo.
      </p>
      <h2>
        What will happen to your personal data at the end of the research
        project?
      </h2>
      <p>
        The study connected to the PhD project is scheduled to end in August
        2023; the data collection process is scheduled to end 1st of July
        2021. The personal data, including any digital recordings will be
        anonymised at that time.
      </p>
      <h2>Your rights</h2>
      <p>
        So long as you can be identified in the collected data, you have the
        right to:
      </p>
      <ul>
        <li>access the personal data that is being processed about you</li>
        <li>request that your personal data is deleted</li>
        <li>
          request that incorrect personal data about you is corrected/rectified
        </li>
        <li>receive a copy of your personal data (data portability), and</li>
        <li>
          send a complaint to the Data Protection Officer or The Norwegian Data
          Protection Authority regarding the processing of your personal data
        </li>
      </ul>
      <h2>What gives us the right to process your personal data?</h2>
      <p>
        We will process your personal data based on your consent. Based on an
        agreement with University of Oslo, NSD – The Norwegian Centre for
        Research Data AS has assessed that the processing of personal data in
        this project is in accordance with data protection legislation.
      </p>
      <h2>Complaints</h2>
      <p>
        Should you have any concerns or complaints about the conduct of the project,
        you are welcome to contact the Executive Officer, Monash University Human Research Ethics Committee (MUHREC):
      </p>
      <p class="pl-4">
        Executive Officer<br />
        Monash University Human Research Ethics Committee (MUHREC)<br />
        Room 111, Chancellery Building D,<br />
        26 Sports Walk, Clayton Campus<br />
        Research Office<br />
        Monash University VIC 3800<br /><br />
        Tel: +61 3 9905 2052<br />
        Email: muhrec@monash.edu<br />
        Fax: +61 3 9905 3831
      </p>
      <p>
        Thank you,
        <br />Professor Dragan Gašević, Chief Investigator
      </p>


      <h1 class="mt-16">Information Norwegian Authorities</h1>
      <h2>Informed consent</h2>
      <h2>
        Project title: Learning with the internet. A mixed-methods study to
        explore undergraduate students’ learning with non-curricular resources
        and digital tools
      </h2>
      <p>
        Thank you for agreeing to participate in the project, ‘Exploring
        undergraduate students’ learning with non-curricular resources and
        digital tools’!
      </p>
      <h2>Purpose of the project</h2>
      <p>
        This project’s aim is to understand how specialized resources available on the Internet become part of the learning process of undergraduate students in computer
        and software engineering programs. Three research questions will be asked about:
        a) Which domain-specific activities and resources involving the Internet are common among the students during their studies?
        b) How do students differ in time when using these resources on the Internet for learning purposes?
        c) How does the use of these resources influences learning activities and tasks that are part of the regular curriculum?
      </p>
      <h2>Who is responsible for the research project?</h2>
      <p>
        University of Oslo, Department of Education is the institution responsible for the project.
      </p>
      <h2>Why are you being asked to participate?</h2>
      <p>
        The study includes students who are part of computer and software engineering programs,
        and your course has being chosen as case for investigating the use of online resources that relate to the domain of your studies.
      </p>
      <h2>What does participation involve for you?</h2>
      <p>
        If you chose to take part in the project, this will involve installing a Google Browser Extension in your personal computer,
        in which you will answer a survey that will last maximum 30 minutes, and taking part in an interview.
        The survey will involve answering questions about learning to program and other software development related activities,
        the websites you use to carry them out, and granting access to the browsing history only of those specific websites you report to use during the survey.
        The interview will last maximum 60 minutes including questions about the goals of carrying out these activities on the Internet and their value for learning,
        the challenges carrying out these activities suppose for you, and their relation with your studies.
        The interview will be audio recorded. All your answers will be anonymized after the data collection process is completed.
      </p>
      <h2>
        How long will the collection of information from the survey and the
        websites you report you use will take?
      </h2>
      <p>
        You are given a period of 3 weeks from the moment you are invited to
        participate in the study to install the Google Chrome Extension and answer the survey.
      </p>
      <h2>
        Do you have to be logged at all times during the data collection period?
      </h2>
      <p>
        No, it is only necessary for the extension to be installed during the time you will answer the survey.
        You are allowed to opt-out at any moment before submitting the survey.
        You can uninstall the Google Chrome Extension once you have submitted the survey.
      </p>
      <h2>
        When is the information from the survey and the websites you report you
        use registered?
      </h2>
      <p>
        The data collection of both survey responses and browsing history data will take place only in the moment the survey is submitted in the Google Chrome Extension.
        There will be no data collection outside of this timeframe.
        This means that even if the Google Chrome Extension is installed beforehand, it will only collect data the moment you submit the survey.
      </p>
      <h2>What happens if you uninstall the Google Chrome Extension?</h2>
      <p>
        If you uninstall the Google Chrome Extension without submitting the survey, no data will be collected.
        If you uninstall the Extension after the survey is submitted, the collected data will remain stored only and securely on a UiO local server.
      </p>
      <h2>
        How is the information from the survey and websites you report you use
        received by us?
      </h2>
      <p>
        The Extension will collect data using the chrome.history API and filtering only the websites you report to use during the survey.
        The information will be processed and stored only and directly on a secure UiO local server.
      </p>
      <h2>
        What information is registered from the websites you report you use?
      </h2>
      <p>
        Once you had submitted your answers to the survey in the Google Chrome Extension reporting the websites you use for learning to program and other software development related activities,
        the Extension will register information from your web browsing history of the last 90 days from the moment you submit the survey, only of those websites you report you use.
        The information collected for each website corresponds to:
      </p>
      <ul>
        <li>Total number of visits.</li>
        <li>The date and time of each visit.</li>
        <li>
          The way the user accessed the particular website each visit (clicking
          a link on another page, typing the URL, clicking a bookmarked link,
          among other alternatives).
        </li>
        <li>The name of the website.</li>
      </ul>
      <h2>Participation is voluntary</h2>
      <p>
        Your participation in the project is voluntary. If you chose to participate, you can withdraw your consent at any time without giving a reason.
        All information about you will then be made anonymous.
        There will be no negative consequences for you if you chose not to participate or later decide to withdraw.
      </p>
      <h2>
        Your personal privacy – how we will store and use your personal data
      </h2>
      <p>
        We will only use your personal data for the purpose(s) specified in this information letter.
        We will process your personal data confidentiality and in accordance with data protection legislation
        (the General Data Protection Regulation and Personal Data Act).
      </p>
      <p>
        Only the PhD candidate and the supervisor will have access to the personal data.
        Your name and contact details will be replaced with a code.
        The list of names, contact details and respective codes will be stored separately from the rest of the collected data.
        The data will be stored in encrypted remote desktop of University of Oslo.
      </p>
      <h2>
        What will happen to your personal data at the end of the research
        project?
      </h2>
      <p>
        The study connected to the PhD project is scheduled to end in August 2023; the data collection process is scheduled to end 1st of January 2021.
        The personal data, including any digital recordings will be anonymised at that time.
      </p>
      <h2>Your rights</h2>
      <p>
        So long as you can be identified in the collected data, you have the right to:
      </p>
      <ul>
        <li>access the personal data that is being processed about you</li>
        <li>request that your personal data is deleted</li>
        <li>
          request that incorrect personal data about you is corrected/rectified
        </li>
        <li>receive a copy of your personal data (data portability), and</li>
        <li>
          send a complaint to the Data Protection Officer or The Norwegian Data
          Protection Authority regarding the processing of your personal data
        </li>
      </ul>
      <h2>What gives us the right to process your personal data?</h2>
      <p>
        We will process your personal data based on your consent.
        Based on an agreement with University of Oslo, NSD – The Norwegian Centre for Research Data AS has assessed that the processing of personal data in this project
        is in accordance with data protection legislation.
      </p>
      <h2>Where can I find out more?</h2>
      <p>
        If you have questions about the project, or want to exercise your
        rights, contact:
      </p>
      <ul>
        <li>
          University of Oslo via Andrés Araos, by email: a.a.a.moya@iped.uio.no
        </li>
        <li>
          Our Data Protection Officer: Maren Magnus Voll, by email:
          personvernombud@uio.no
        </li>
        <li>
          NSD – The Norwegian Centre for Research Data AS, by email:
          (personverntjenester@nsd.no) or by telephone: +47 55 58 21 17.
        </li>
      </ul>
      <p>
        Yours sincerely,
        <br />PhD Candidate: Andrés Arturo Araos Moya <br />Supervisor: Crina
        Damsa
      </p>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "confirm": "Confirm",
    "email": "Email address"
  },
  "no": {
    "confirm": "Bekreft",
    "email": "E-postadresse"
  }
}
</i18n>

<style scoped lang="postcss">
p {
  @apply pt-2;
}
h1 {
  @apply font-bold text-2xl mb-4;
}
h2 {
  @apply pt-4 font-bold;
}
ul {
  @apply list-inside m-2;
}
</style>
