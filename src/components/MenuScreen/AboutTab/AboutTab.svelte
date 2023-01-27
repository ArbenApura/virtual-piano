<script lang="ts">
	// IMPORTED LIB-UTILS
	import { onMount } from 'svelte';

	// STATES
	let isMounted = false;
	let sectionIsOpen = [true, true, true, true, true];

	// REACTIVE STATEMENTS
	$: sectionIsOpen && saveState();

	// UTILS
	const saveState = () => {
		try {
			if (!isMounted) return;
			localStorage.setItem('AboutTab.sectionIsOpen', JSON.stringify(sectionIsOpen));
		} catch {}
	};
	const loadState = () => {
		try {
			const item = localStorage.getItem('AboutTab.sectionIsOpen');
			if (!item) return;
			sectionIsOpen = JSON.parse(item);
		} catch {}
	};

	// LIFECYCLES
	onMount(() => {
		isMounted = true;
		loadState();
	});
</script>

<div class="tab">
	<div class="section" data-is-open={sectionIsOpen[0]}>
		<button class="section-header" on:click={() => (sectionIsOpen[0] = !sectionIsOpen[0])}>
			<i class="ti ti-chevron-{sectionIsOpen[0] ? 'down' : 'right'}" />
			<h6>Virtual Piano</h6>
		</button>
		{#if sectionIsOpen[0]}
			<div class="section-body">
				<p>
					The Virtual Piano is an online application that makes learning piano easy and
					fun. With its web-based interface, you can play some of the world's most
					renowned classical compositions without having to worry about the physical
					aspects of playing the instrument. The Virtual Piano is a great tool for those
					who want to learn the piano or simply enjoy playing classical music.
				</p>
			</div>
		{/if}
	</div>
	<div class="section" data-is-open={sectionIsOpen[1]}>
		<button class="section-header" on:click={() => (sectionIsOpen[1] = !sectionIsOpen[1])}>
			<i class="ti ti-chevron-{sectionIsOpen[1] ? 'down' : 'right'}" />
			<h6>Developer</h6>
		</button>
		{#if sectionIsOpen[1]}
			<div class="section-body">
				<p>
					Arben Apura is the developer of this web application. He is currently studying
					for a BSIT degree at Bulacan State University Sarmiento Campus. Arben has been
					passionate about web development since he was a young student. Since then, he
					has strived to create applications that are both functional and visually
					appealing. In developing this web application, Arben kept this goal in mind in
					order to create a product that would be useful and enjoyable for users.
				</p>
			</div>
		{/if}
	</div>
	<div class="section" data-is-open={sectionIsOpen[2]}>
		<button class="section-header" on:click={() => (sectionIsOpen[2] = !sectionIsOpen[2])}>
			<i class="ti ti-chevron-{sectionIsOpen[2] ? 'down' : 'right'}" />
			<h6>Support Us</h6>
		</button>
		{#if sectionIsOpen[2]}
			<div class="section-body">
				<p>
					If you enjoy this site, please consider recommending it to your friends or
					sponsoring us with a small amount through GCash (09266943578) or
					<a
						class="text-blue-400 hover:underline"
						href="https://paypal.me/ArbenApura?country.x=PH&locale.x=en_US">Paypal</a
					>. Your support helps us keep the site running and makes it possible for us to
					continue providing high-quality features. Thank you!
				</p>
			</div>
		{/if}
	</div>
	<div class="section" data-is-open={sectionIsOpen[3]}>
		<button class="section-header" on:click={() => (sectionIsOpen[3] = !sectionIsOpen[3])}>
			<i class="ti ti-chevron-{sectionIsOpen[3] ? 'down' : 'right'}" />
			<h6>Terms and Conditions</h6>
		</button>
		{#if sectionIsOpen[3]}
			<div class="section-body flex flex-col gap-2">
				<p>Last updated: 2023-01-28</p>
				<p>1. <b>Introduction</b></p>
				<p>Welcome to <b>Virtual Piano By Arben</b> (“Company”, “we”, “our”, “us”)!</p>
				<p>
					These Terms of Service (“Terms”, “Terms of Service”) govern your use of our
					website located at <b>http://virtualpianobyarben.online/</b> (together or
					individually “Service”) operated by <b>Virtual Piano By Arben</b>.
				</p>
				<p>
					Our Privacy Policy also governs your use of our Service and explains how we
					collect, safeguard and disclose information that results from your use of our
					web pages.
				</p>
				<p>
					Your agreement with us includes these Terms and our Privacy Policy
					(“Agreements”). You acknowledge that you have read and understood Agreements,
					and agree to be bound of them.
				</p>
				<p>
					If you do not agree with (or cannot comply with) Agreements, then you may not
					use the Service, but please let us know by emailing at <b
						>arbenapura.official@gmail.com</b
					> so we can try to find a solution. These Terms apply to all visitors, users and
					others who wish to access or use Service.
				</p>
				<p>2. <b>Communications</b></p>
				<p>
					By using our Service, you agree to subscribe to newsletters, marketing or
					promotional materials and other information we may send. However, you may opt
					out of receiving any, or all, of these communications from us by following the
					unsubscribe link or by emailing at arbenapura.official@gmail.com.
				</p>

				<p>3. <b>Contests, Sweepstakes and Promotions</b></p>
				<p>
					Any contests, sweepstakes or other promotions (collectively, “Promotions”) made
					available through Service may be governed by rules that are separate from these
					Terms of Service. If you participate in any Promotions, please review the
					applicable rules as well as our Privacy Policy. If the rules for a Promotion
					conflict with these Terms of Service, Promotion rules will apply.
				</p>

				<p>4. <b>Content</b></p>
				<p>
					Content found on or through this Service are the property of Virtual Piano By
					Arben or used with permission. You may not distribute, modify, transmit, reuse,
					download, repost, copy, or use said Content, whether in whole or in part, for
					commercial purposes or for personal gain, without express advance written
					permission from us.
				</p>
				<p>5. <b>Prohibited Uses</b></p>
				<p>
					You may use Service only for lawful purposes and in accordance with Terms. You
					agree not to use Service:
				</p>
				<p>
					0.1. In any way that violates any applicable national or international law or
					regulation.
				</p>
				<p>
					0.2. For the purpose of exploiting, harming, or attempting to exploit or harm
					minors in any way by exposing them to inappropriate content or otherwise.
				</p>
				<p>
					0.3. To transmit, or procure the sending of, any advertising or promotional
					material, including any “junk mail”, “chain letter,” “spam,” or any other
					similar solicitation.
				</p>
				<p>
					0.4. To impersonate or attempt to impersonate Company, a Company employee,
					another user, or any other person or entity.
				</p>
				<p>
					0.5. In any way that infringes upon the rights of others, or in any way is
					illegal, threatening, fraudulent, or harmful, or in connection with any
					unlawful, illegal, fraudulent, or harmful purpose or activity.
				</p>
				<p>
					0.6. To engage in any other conduct that restricts or inhibits anyone’s use or
					enjoyment of Service, or which, as determined by us, may harm or offend Company
					or users of Service or expose them to liability.
				</p>
				<p>Additionally, you agree not to:</p>
				<p>
					0.1. Use Service in any manner that could disable, overburden, damage, or impair
					Service or interfere with any other party’s use of Service, including their
					ability to engage in real time activities through Service.
				</p>
				<p>
					0.2. Use any robot, spider, or other automatic device, process, or means to
					access Service for any purpose, including monitoring or copying any of the
					material on Service.
				</p>
				<p>
					0.3. Use any manual process to monitor or copy any of the material on Service or
					for any other unauthorized purpose without our prior written consent.
				</p>
				<p>
					0.4. Use any device, software, or routine that interferes with the proper
					working of Service.
				</p>
				<p>
					0.5. Introduce any viruses, trojan horses, worms, logic bombs, or other material
					which is malicious or technologically harmful.
				</p>
				<p>
					0.6. Attempt to gain unauthorized access to, interfere with, damage, or disrupt
					any parts of Service, the server on which Service is stored, or any server,
					computer, or database connected to Service.
				</p>
				<p>
					0.7. Attack Service via a denial-of-service attack or a distributed
					denial-of-service attack.
				</p>
				<p>0.8. Take any action that may damage or falsify Company rating.</p>
				<p>0.9. Otherwise attempt to interfere with the proper working of Service.</p>
				<p>6. <b>Analytics</b></p>
				<p>
					We may use third-party Service Providers to monitor and analyze the use of our
					Service.
				</p>
				<p>7. <b>No Use By Minors</b></p>
				<p>
					Service is intended only for access and use by individuals at least eighteen
					(18) years old. By accessing or using Service, you warrant and represent that
					you are at least eighteen (18) years of age and with the full authority, right,
					and capacity to enter into this agreement and abide by all of the terms and
					conditions of Terms. If you are not at least eighteen (18) years old, you are
					prohibited from both the access and usage of Service.
				</p>

				<p>8. <b>Intellectual Property</b></p>
				<p>
					Service and its original content (excluding Content provided by users), features
					and functionality are and will remain the exclusive property of Virtual Piano By
					Arben and its licensors. Service is protected by copyright, trademark, and other
					laws of and foreign countries. Our trademarks may not be used in connection with
					any product or service without the prior written consent of Virtual Piano By
					Arben.
				</p>
				<p>9. <b>Copyright Policy</b></p>
				<p>
					We respect the intellectual property rights of others. It is our policy to
					respond to any claim that Content posted on Service infringes on the copyright
					or other intellectual property rights (“Infringement”) of any person or entity.
				</p>
				<p>
					If you are a copyright owner, or authorized on behalf of one, and you believe
					that the copyrighted work has been copied in a way that constitutes copyright
					infringement, please submit your claim via email to
					arbenapura.official@gmail.com, with the subject line: “Copyright Infringement”
					and include in your claim a detailed description of the alleged Infringement as
					detailed below, under “DMCA Notice and Procedure for Copyright Infringement
					Claims”
				</p>
				<p>
					You may be held accountable for damages (including costs and attorneys’ fees)
					for misrepresentation or bad-faith claims on the infringement of any Content
					found on and/or through Service on your copyright.
				</p>
				<p>10. <b>DMCA Notice and Procedure for Copyright Infringement Claims</b></p>
				<p>
					You may submit a notification pursuant to the Digital Millennium Copyright Act
					(DMCA) by providing our Copyright Agent with the following information in
					writing (see 17 U.S.C 512(c)(3) for further detail):
				</p>
				<p>
					0.1. an electronic or physical signature of the person authorized to act on
					behalf of the owner of the copyright’s interest;
				</p>
				<p>
					0.2. a description of the copyrighted work that you claim has been infringed,
					including the URL (i.e., web page address) of the location where the copyrighted
					work exists or a copy of the copyrighted work;
				</p>
				<p>
					0.3. identification of the URL or other specific location on Service where the
					material that you claim is infringing is located;
				</p>
				<p>0.4. your address, telephone number, and email address;</p>
				<p>
					0.5. a statement by you that you have a good faith belief that the disputed use
					is not authorized by the copyright owner, its agent, or the law;
				</p>
				<p>
					0.6. a statement by you, made under penalty of perjury, that the above
					information in your notice is accurate and that you are the copyright owner or
					authorized to act on the copyright owner’s behalf.
				</p>
				<p>
					You can contact our Copyright Agent via email at arbenapura.official@gmail.com.
				</p>
				<p>11. <b>Error Reporting and Feedback</b></p>
				<p>
					You may provide us either directly at arbenapura.official@gmail.com or via third
					party sites and tools with information and feedback concerning errors,
					suggestions for improvements, ideas, problems, complaints, and other matters
					related to our Service (“Feedback”). You acknowledge and agree that: (i) you
					shall not retain, acquire or assert any intellectual property right or other
					right, title or interest in or to the Feedback; (ii) Company may have
					development ideas similar to the Feedback; (iii) Feedback does not contain
					confidential information or proprietary information from you or any third party;
					and (iv) Company is not under any obligation of confidentiality with respect to
					the Feedback. In the event the transfer of the ownership to the Feedback is not
					possible due to applicable mandatory laws, you grant Company and its affiliates
					an exclusive, transferable, irrevocable, free-of-charge, sub-licensable,
					unlimited and perpetual right to use (including copy, modify, create derivative
					works, publish, distribute and commercialize) Feedback in any manner and for any
					purpose.
				</p>
				<p>12. <b>Links To Other Web Sites</b></p>
				<p>
					Our Service may contain links to third party web sites or services that are not
					owned or controlled by Virtual Piano By Arben.
				</p>
				<p>
					Virtual Piano By Arben has no control over, and assumes no responsibility for
					the content, privacy policies, or practices of any third party web sites or
					services. We do not warrant the offerings of any of these entities/individuals
					or their websites.
				</p>
				<p>
					For example, the outlined <a href="https://policymaker.io/terms-and-conditions/"
						>Terms of Use</a
					>
					have been created using <a href="https://policymaker.io/">PolicyMaker.io</a>, a
					free web application for generating high-quality legal documents. PolicyMaker’s
					<a href="https://policymaker.io/terms-and-conditions/"
						>Terms and Conditions generator</a
					> is an easy-to-use free tool for creating an excellent standard Terms of Service
					template for a website, blog, e-commerce store or app.
				</p>
				<p>
					YOU ACKNOWLEDGE AND AGREE THAT COMPANY SHALL NOT BE RESPONSIBLE OR LIABLE,
					DIRECTLY OR INDIRECTLY, FOR ANY DAMAGE OR LOSS CAUSED OR ALLEGED TO BE CAUSED BY
					OR IN CONNECTION WITH USE OF OR RELIANCE ON ANY SUCH CONTENT, GOODS OR SERVICES
					AVAILABLE ON OR THROUGH ANY SUCH THIRD PARTY WEB SITES OR SERVICES.
				</p>
				<p>
					WE STRONGLY ADVISE YOU TO READ THE TERMS OF SERVICE AND PRIVACY POLICIES OF ANY
					THIRD PARTY WEB SITES OR SERVICES THAT YOU VISIT.
				</p>
				<p>13. <b>Disclaimer Of Warranty</b></p>
				<p>
					THESE SERVICES ARE PROVIDED BY COMPANY ON AN “AS IS” AND “AS AVAILABLE” BASIS.
					COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED,
					AS TO THE OPERATION OF THEIR SERVICES, OR THE INFORMATION, CONTENT OR MATERIALS
					INCLUDED THEREIN. YOU EXPRESSLY AGREE THAT YOUR USE OF THESE SERVICES, THEIR
					CONTENT, AND ANY SERVICES OR ITEMS OBTAINED FROM US IS AT YOUR SOLE RISK.
				</p>
				<p>
					NEITHER COMPANY NOR ANY PERSON ASSOCIATED WITH COMPANY MAKES ANY WARRANTY OR
					REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY,
					ACCURACY, OR AVAILABILITY OF THE SERVICES. WITHOUT LIMITING THE FOREGOING,
					NEITHER COMPANY NOR ANYONE ASSOCIATED WITH COMPANY REPRESENTS OR WARRANTS THAT
					THE SERVICES, THEIR CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE
					SERVICES WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS
					WILL BE CORRECTED, THAT THE SERVICES OR THE SERVER THAT MAKES IT AVAILABLE ARE
					FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS OR THAT THE SERVICES OR ANY SERVICES
					OR ITEMS OBTAINED THROUGH THE SERVICES WILL OTHERWISE MEET YOUR NEEDS OR
					EXPECTATIONS.
				</p>
				<p>
					COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED,
					STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
					MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.
				</p>
				<p>
					THE FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE EXCLUDED OR LIMITED
					UNDER APPLICABLE LAW.
				</p>
				<p>14. <b>Limitation Of Liability</b></p>
				<p>
					EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR OFFICERS, DIRECTORS,
					EMPLOYEES, AND AGENTS HARMLESS FOR ANY INDIRECT, PUNITIVE, SPECIAL, INCIDENTAL,
					OR CONSEQUENTIAL DAMAGE, HOWEVER IT ARISES (INCLUDING ATTORNEYS’ FEES AND ALL
					RELATED COSTS AND EXPENSES OF LITIGATION AND ARBITRATION, OR AT TRIAL OR ON
					APPEAL, IF ANY, WHETHER OR NOT LITIGATION OR ARBITRATION IS INSTITUTED), WHETHER
					IN AN ACTION OF CONTRACT, NEGLIGENCE, OR OTHER TORTIOUS ACTION, OR ARISING OUT
					OF OR IN CONNECTION WITH THIS AGREEMENT, INCLUDING WITHOUT LIMITATION ANY CLAIM
					FOR PERSONAL INJURY OR PROPERTY DAMAGE, ARISING FROM THIS AGREEMENT AND ANY
					VIOLATION BY YOU OF ANY FEDERAL, STATE, OR LOCAL LAWS, STATUTES, RULES, OR
					REGULATIONS, EVEN IF COMPANY HAS BEEN PREVIOUSLY ADVISED OF THE POSSIBILITY OF
					SUCH DAMAGE. EXCEPT AS PROHIBITED BY LAW, IF THERE IS LIABILITY FOUND ON THE
					PART OF COMPANY, IT WILL BE LIMITED TO THE AMOUNT PAID FOR THE PRODUCTS AND/OR
					SERVICES, AND UNDER NO CIRCUMSTANCES WILL THERE BE CONSEQUENTIAL OR PUNITIVE
					DAMAGES. SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF PUNITIVE,
					INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE PRIOR LIMITATION OR EXCLUSION MAY
					NOT APPLY TO YOU.
				</p>
				<p>15. <b>Termination</b></p>
				<p>
					We may terminate or suspend your account and bar access to Service immediately,
					without prior notice or liability, under our sole discretion, for any reason
					whatsoever and without limitation, including but not limited to a breach of
					Terms.
				</p>
				<p>
					If you wish to terminate your account, you may simply discontinue using Service.
				</p>
				<p>
					All provisions of Terms which by their nature should survive termination shall
					survive termination, including, without limitation, ownership provisions,
					warranty disclaimers, indemnity and limitations of liability.
				</p>
				<p>16. <b>Governing Law</b></p>
				<p>
					These Terms shall be governed and construed in accordance with the laws of
					Philippines, which governing law applies to agreement without regard to its
					conflict of law provisions.
				</p>
				<p>
					Our failure to enforce any right or provision of these Terms will not be
					considered a waiver of those rights. If any provision of these Terms is held to
					be invalid or unenforceable by a court, the remaining provisions of these Terms
					will remain in effect. These Terms constitute the entire agreement between us
					regarding our Service and supersede and replace any prior agreements we might
					have had between us regarding Service.
				</p>
				<p>17. <b>Changes To Service</b></p>
				<p>
					We reserve the right to withdraw or amend our Service, and any service or
					material we provide via Service, in our sole discretion without notice. We will
					not be liable if for any reason all or any part of Service is unavailable at any
					time or for any period. From time to time, we may restrict access to some parts
					of Service, or the entire Service, to users, including registered users.
				</p>
				<p>18. <b>Amendments To Terms</b></p>
				<p>
					We may amend Terms at any time by posting the amended terms on this site. It is
					your responsibility to review these Terms periodically.
				</p>
				<p>
					Your continued use of the Platform following the posting of revised Terms means
					that you accept and agree to the changes. You are expected to check this page
					frequently so you are aware of any changes, as they are binding on you.
				</p>
				<p>
					By continuing to access or use our Service after any revisions become effective,
					you agree to be bound by the revised terms. If you do not agree to the new
					terms, you are no longer authorized to use Service.
				</p>
				<p>19. <b>Waiver And Severability</b></p>
				<p>
					No waiver by Company of any term or condition set forth in Terms shall be deemed
					a further or continuing waiver of such term or condition or a waiver of any
					other term or condition, and any failure of Company to assert a right or
					provision under Terms shall not constitute a waiver of such right or provision.
				</p>
				<p>
					If any provision of Terms is held by a court or other tribunal of competent
					jurisdiction to be invalid, illegal or unenforceable for any reason, such
					provision shall be eliminated or limited to the minimum extent such that the
					remaining provisions of Terms will continue in full force and effect.
				</p>
				<p>20. <b>Acknowledgement</b></p>
				<p>
					BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU ACKNOWLEDGE THAT YOU HAVE
					READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM.
				</p>
				<p>21. <b>Contact Us</b></p>
				<p>
					Please send your feedback, comments, requests for technical support by email: <b
						>arbenapura.official@gmail.com</b
					>.
				</p>
				<p style="margin-top: 2em; font-size: 0.7em;">
					These <a href="https://policymaker.io/terms-and-conditions/">Terms of Service</a
					>
					were created for <b>http://virtualpianobyarben.online/</b> by
					<a href="https://policymaker.io">PolicyMaker.io</a> on 2023-01-28.
				</p>
			</div>
		{/if}
	</div>
	<div class="section" data-is-open={sectionIsOpen[4]}>
		<button class="section-header" on:click={() => (sectionIsOpen[4] = !sectionIsOpen[4])}>
			<i class="ti ti-chevron-{sectionIsOpen[4] ? 'down' : 'right'}" />
			<h6>Privacy Policy</h6>
		</button>
		{#if sectionIsOpen[4]}
			<div class="section-body flex flex-col gap-2">
				<p>Effective date: 2023-01-28</p>
				<p>1. <b>Introduction</b></p>
				<p>Welcome to <b> Virtual Piano By Arben</b>.</p>
				<p>
					<b>Virtual Piano By Arben</b> (“us”, “we”, or “our”) operates
					<b>http://virtualpianobyarben.online/</b>
					(hereinafter referred to as <b>“Service”</b>).
				</p>
				<p>
					Our Privacy Policy governs your visit to <b
						>http://virtualpianobyarben.online/</b
					>, and explains how we collect, safeguard and disclose information that results
					from your use of our Service.
				</p>
				<p>
					We use your data to provide and improve Service. By using Service, you agree to
					the collection and use of information in accordance with this policy. Unless
					otherwise defined in this Privacy Policy, the terms used in this Privacy Policy
					have the same meanings as in our Terms and Conditions.
				</p>
				<p>
					Our Terms and Conditions (<b>“Terms”</b>) govern all use of our Service and
					together with the Privacy Policy constitutes your agreement with us (<b
						>“agreement”</b
					>).
				</p>
				<p>2. <b>Definitions</b></p>
				<p>
					<b>SERVICE</b> means the http://virtualpianobyarben.online/ website operated by Virtual
					Piano By Arben.
				</p>
				<p>
					<b>PERSONAL DATA</b> means data about a living individual who can be identified from
					those data (or from those and other information either in our possession or likely
					to come into our possession).
				</p>
				<p>
					<b>USAGE DATA</b> is data collected automatically either generated by the use of
					Service or from Service infrastructure itself (for example, the duration of a page
					visit).
				</p>
				<p>
					<b>COOKIES</b> are small files stored on your device (computer or mobile device).
				</p>
				<p>
					<b>DATA CONTROLLER</b> means a natural or legal person who (either alone or jointly
					or in common with other persons) determines the purposes for which and the manner
					in which any personal data are, or are to be, processed. For the purpose of this
					Privacy Policy, we are a Data Controller of your data.
				</p>
				<p>
					<b>DATA PROCESSORS (OR SERVICE PROVIDERS)</b> means any natural or legal person who
					processes the data on behalf of the Data Controller. We may use the services of various
					Service Providers in order to process your data more effectively.
				</p>
				<p>
					<b>DATA SUBJECT</b> is any living individual who is the subject of Personal Data.
				</p>
				<p>
					<b>THE USER</b> is the individual using our Service. The User corresponds to the
					Data Subject, who is the subject of Personal Data.
				</p>
				<p>3. <b>Information Collection and Use</b></p>
				<p>
					We collect several different types of information for various purposes to
					provide and improve our Service to you.
				</p>
				<p>4. <b>Types of Data Collected</b></p>
				<p><b>Personal Data</b></p>
				<p>
					While using our Service, we may ask you to provide us with certain personally
					identifiable information that can be used to contact or identify you (<b
						>“Personal Data”</b
					>). Personally identifiable information may include, but is not limited to:
				</p>
				<p>0.1. Email address</p>
				<p>0.2. First name and last name</p>
				<p>0.3. Phone number</p>
				<p>0.4. Address, Country, State, Province, ZIP/Postal code, City</p>
				<p>0.5. Cookies and Usage Data</p>
				<p>
					We may use your Personal Data to contact you with newsletters, marketing or
					promotional materials and other information that may be of interest to you. You
					may opt out of receiving any, or all, of these communications from us by
					following the unsubscribe link.
				</p>
				<p><b>Usage Data</b></p>
				<p>
					We may also collect information that your browser sends whenever you visit our
					Service or when you access Service by or through any device (<b>“Usage Data”</b
					>).
				</p>
				<p>
					This Usage Data may include information such as your computer’s Internet
					Protocol address (e.g. IP address), browser type, browser version, the pages of
					our Service that you visit, the time and date of your visit, the time spent on
					those pages, unique device identifiers and other diagnostic data.
				</p>
				<p>
					When you access Service with a device, this Usage Data may include information
					such as the type of device you use, your device unique ID, the IP address of
					your device, your device operating system, the type of Internet browser you use,
					unique device identifiers and other diagnostic data.
				</p>

				<p><b>Tracking Cookies Data</b></p>
				<p>
					We use cookies and similar tracking technologies to track the activity on our
					Service and we hold certain information.
				</p>
				<p>
					Cookies are files with a small amount of data which may include an anonymous
					unique identifier. Cookies are sent to your browser from a website and stored on
					your device. Other tracking technologies are also used such as beacons, tags and
					scripts to collect and track information and to improve and analyze our Service.
				</p>
				<p>
					You can instruct your browser to refuse all cookies or to indicate when a cookie
					is being sent. However, if you do not accept cookies, you may not be able to use
					some portions of our Service.
				</p>
				<p>Examples of Cookies we use:</p>
				<p>0.1. <b>Session Cookies:</b> We use Session Cookies to operate our Service.</p>
				<p>
					0.2. <b>Preference Cookies:</b> We use Preference Cookies to remember your preferences
					and various settings.
				</p>
				<p>0.3. <b>Security Cookies:</b> We use Security Cookies for security purposes.</p>
				<p>
					0.4. <b>Advertising Cookies:</b> Advertising Cookies are used to serve you with advertisements
					that may be relevant to you and your interests.
				</p>
				<p><b>Other Data</b></p>
				<p>
					While using our Service, we may also collect the following information: sex,
					age, date of birth, place of birth, passport details, citizenship, registration
					at place of residence and actual address, telephone number (work, mobile),
					details of documents on education, qualification, professional training,
					employment agreements, <a
						href="https://policymaker.io/non-disclosure-agreement/">NDA agreements</a
					>, information on bonuses and compensation, information on marital status,
					family members, social security (or other taxpayer identification) number,
					office location and other data.
				</p>
				<p>5. <b>Use of Data</b></p>
				<p>Virtual Piano By Arben uses the collected data for various purposes:</p>
				<p>0.1. to provide and maintain our Service;</p>
				<p>0.2. to notify you about changes to our Service;</p>
				<p>
					0.3. to allow you to participate in interactive features of our Service when you
					choose to do so;
				</p>
				<p>0.4. to provide customer support;</p>
				<p>
					0.5. to gather analysis or valuable information so that we can improve our
					Service;
				</p>
				<p>0.6. to monitor the usage of our Service;</p>
				<p>0.7. to detect, prevent and address technical issues;</p>
				<p>0.8. to fulfil any other purpose for which you provide it;</p>
				<p>
					0.9. to carry out our obligations and enforce our rights arising from any
					contracts entered into between you and us, including for billing and collection;
				</p>
				<p>
					0.10. to provide you with notices about your account and/or subscription,
					including expiration and renewal notices, email-instructions, etc.;
				</p>
				<p>
					0.11. to provide you with news, special offers and general information about
					other goods, services and events which we offer that are similar to those that
					you have already purchased or enquired about unless you have opted not to
					receive such information;
				</p>
				<p>0.12. in any other way we may describe when you provide the information;</p>
				<p>0.13. for any other purpose with your consent.</p>
				<p>6. <b>Retention of Data</b></p>
				<p>
					We will retain your Personal Data only for as long as is necessary for the
					purposes set out in this Privacy Policy. We will retain and use your Personal
					Data to the extent necessary to comply with our legal obligations (for example,
					if we are required to retain your data to comply with applicable laws), resolve
					disputes, and enforce our legal agreements and policies.
				</p>
				<p>
					We will also retain Usage Data for internal analysis purposes. Usage Data is
					generally retained for a shorter period, except when this data is used to
					strengthen the security or to improve the functionality of our Service, or we
					are legally obligated to retain this data for longer time periods.
				</p>
				<p>7. <b>Transfer of Data</b></p>
				<p>
					Your information, including Personal Data, may be transferred to – and
					maintained on – computers located outside of your state, province, country or
					other governmental jurisdiction where the data protection laws may differ from
					those of your jurisdiction.
				</p>
				<p>
					If you are located outside Philippines and choose to provide information to us,
					please note that we transfer the data, including Personal Data, to Philippines
					and process it there.
				</p>
				<p>
					Your consent to this Privacy Policy followed by your submission of such
					information represents your agreement to that transfer.
				</p>
				<p>
					Virtual Piano By Arben will take all the steps reasonably necessary to ensure
					that your data is treated securely and in accordance with this Privacy Policy
					and no transfer of your Personal Data will take place to an organisation or a
					country unless there are adequate controls in place including the security of
					your data and other personal information.
				</p>
				<p>8. <b>Disclosure of Data</b></p>
				<p>We may disclose personal information that we collect, or you provide:</p>
				<p>0.1. <b>Disclosure for Law Enforcement.</b></p>
				<p>
					Under certain circumstances, we may be required to disclose your Personal Data
					if required to do so by law or in response to valid requests by public
					authorities.
				</p>
				<p>0.2. <b>Business Transaction.</b></p>
				<p>
					If we or our subsidiaries are involved in a merger, acquisition or asset sale,
					your Personal Data may be transferred.
				</p>
				<p>0.3. <b>Other cases. We may disclose your information also:</b></p>
				<p>0.3.1. to our subsidiaries and affiliates;</p>
				<p>
					0.3.2. to contractors, service providers, and other third parties we use to
					support our business;
				</p>
				<p>0.3.3. to fulfill the purpose for which you provide it;</p>
				<p>0.3.4. for the purpose of including your company’s logo on our website;</p>
				<p>
					0.3.5. for any other purpose disclosed by us when you provide the information;
				</p>
				<p>0.3.6. with your consent in any other cases;</p>
				<p>
					0.3.7. if we believe disclosure is necessary or appropriate to protect the
					rights, property, or safety of the Company, our customers, or others.
				</p>
				<p>9. <b>Security of Data</b></p>
				<p>
					The security of your data is important to us but remember that no method of
					transmission over the Internet or method of electronic storage is 100% secure.
					While we strive to use commercially acceptable means to protect your Personal
					Data, we cannot guarantee its absolute security.
				</p>
				<p>
					10. <b
						>Your Data Protection Rights Under General Data Protection Regulation (GDPR)
					</b>
				</p>
				<p>
					If you are a resident of the European Union (EU) and European Economic Area
					(EEA), you have certain data protection rights, covered by GDPR.
				</p>
				<p>
					We aim to take reasonable steps to allow you to correct, amend, delete, or limit
					the use of your Personal Data.
				</p>
				<p>
					If you wish to be informed what Personal Data we hold about you and if you want
					it to be removed from our systems, please email us at <b
						>arbenapura.official@gmail.com</b
					>.
				</p>
				<p>In certain circumstances, you have the following data protection rights:</p>
				<p>0.1. the right to access, update or to delete the information we have on you;</p>
				<p>
					0.2. the right of rectification. You have the right to have your information
					rectified if that information is inaccurate or incomplete;
				</p>
				<p>
					0.3. the right to object. You have the right to object to our processing of your
					Personal Data;
				</p>
				<p>
					0.4. the right of restriction. You have the right to request that we restrict
					the processing of your personal information;
				</p>
				<p>
					0.5. the right to data portability. You have the right to be provided with a
					copy of your Personal Data in a structured, machine-readable and commonly used
					format;
				</p>
				<p>
					0.6. the right to withdraw consent. You also have the right to withdraw your
					consent at any time where we rely on your consent to process your personal
					information;
				</p>
				<p>
					Please note that we may ask you to verify your identity before responding to
					such requests. Please note, we may not able to provide Service without some
					necessary data.
				</p>
				<p>
					You have the right to complain to a Data Protection Authority about our
					collection and use of your Personal Data. For more information, please contact
					your local data protection authority in the European Economic Area (EEA).
				</p>
				<p>
					11. <b
						>Your Data Protection Rights under the California Privacy Protection Act
						(CalOPPA)</b
					>
				</p>
				<p>
					CalOPPA is the first state law in the nation to require commercial websites and
					online services to post a privacy policy. The law’s reach stretches well beyond
					California to require a person or company in the United States (and conceivable
					the world) that operates websites collecting personally identifiable information
					from California consumers to post a conspicuous privacy policy on its website
					stating exactly the information being collected and those individuals with whom
					it is being shared, and to comply with this policy.
				</p>
				<p>According to CalOPPA we agree to the following:</p>
				<p>0.1. users can visit our site anonymously;</p>
				<p>
					0.2. our Privacy Policy link includes the word “Privacy”, and can easily be
					found on the home page of our website;
				</p>
				<p>
					0.3. users will be notified of any privacy policy changes on our Privacy Policy
					Page;
				</p>
				<p>
					0.4. users are able to change their personal information by emailing us at <b
						>arbenapura.official@gmail.com</b
					>.
				</p>
				<p>Our Policy on “Do Not Track” Signals:</p>
				<p>
					We honor Do Not Track signals and do not track, plant cookies, or use
					advertising when a Do Not Track browser mechanism is in place. Do Not Track is a
					preference you can set in your web browser to inform websites that you do not
					want to be tracked.
				</p>
				<p>
					You can enable or disable Do Not Track by visiting the Preferences or Settings
					page of your web browser.
				</p>
				<p>
					12. <b
						>Your Data Protection Rights under the California Consumer Privacy Act
						(CCPA)</b
					>
				</p>
				<p>
					If you are a California resident, you are entitled to learn what data we collect
					about you, ask to delete your data and not to sell (share) it. To exercise your
					data protection rights, you can make certain requests and ask us:
				</p>
				<p>
					<b
						>0.1. What personal information we have about you. If you make this request,
						we will return to you:</b
					>
				</p>
				<p>0.0.1. The categories of personal information we have collected about you.</p>
				<p>
					0.0.2. The categories of sources from which we collect your personal
					information.
				</p>
				<p>
					0.0.3. The business or commercial purpose for collecting or selling your
					personal information.
				</p>
				<p>
					0.0.4. The categories of third parties with whom we share personal information.
				</p>
				<p>
					0.0.5. The specific pieces of personal information we have collected about you.
				</p>
				<p>
					0.0.6. A list of categories of personal information that we have sold, along
					with the category of any other company we sold it to. If we have not sold your
					personal information, we will inform you of that fact.
				</p>
				<p>
					0.0.7. A list of categories of personal information that we have disclosed for a
					business purpose, along with the category of any other company we shared it
					with.
				</p>
				<p>
					Please note, you are entitled to ask us to provide you with this information up
					to two times in a rolling twelve-month period. When you make this request, the
					information provided may be limited to the personal information we collected
					about you in the previous 12 months.
				</p>
				<p>
					<b
						>0.2. To delete your personal information. If you make this request, we will
						delete the personal information we hold about you as of the date of your
						request from our records and direct any service providers to do the same. In
						some cases, deletion may be accomplished through de-identification of the
						information. If you choose to delete your personal information, you may not
						be able to use certain functions that require your personal information to
						operate.</b
					>
				</p>
				<p>
					<b
						>0.3. To stop selling your personal information. We don’t sell or rent your
						personal information to any third parties for any purpose. We do not sell
						your personal information for monetary consideration. However, under some
						circumstances, a transfer of personal information to a third party, or
						within our family of companies, without monetary consideration may be
						considered a “sale” under California law. You are the only owner of your
						Personal Data and can request disclosure or deletion at any time.</b
					>
				</p>
				<p>
					If you submit a request to stop selling your personal information, we will stop
					making such transfers.
				</p>
				<p>
					Please note, if you ask us to delete or stop selling your data, it may impact
					your experience with us, and you may not be able to participate in certain
					programs or membership services which require the usage of your personal
					information to function. But in no circumstances, we will discriminate against
					you for exercising your rights.
				</p>
				<p>
					To exercise your California data protection rights described above, please send
					your request(s) by email: <b>arbenapura.official@gmail.com</b>.
				</p>
				<p>
					Your data protection rights, described above, are covered by the CCPA, short for
					the California Consumer Privacy Act. To find out more, visit the official
					California Legislative Information website. The CCPA took effect on 01/01/2020.
				</p>
				<p>13. <b>Service Providers</b></p>
				<p>
					We may employ third party companies and individuals to facilitate our Service (<b
						>“Service Providers”</b
					>), provide Service on our behalf, perform Service-related services or assist us
					in analysing how our Service is used.
				</p>
				<p>
					These third parties have access to your Personal Data only to perform these
					tasks on our behalf and are obligated not to disclose or use it for any other
					purpose.
				</p>
				<p>14. <b>Analytics</b></p>
				<p>
					We may use third-party Service Providers to monitor and analyze the use of our
					Service.
				</p>
				<p>15. <b>CI/CD tools</b></p>
				<p>
					We may use third-party Service Providers to automate the development process of
					our Service.
				</p>

				<p>16. <b>Behavioral Remarketing</b></p>
				<p>
					We may use remarketing services to advertise on third party websites to you
					after you visited our Service. We and our third-party vendors use cookies to
					inform, optimise and serve ads based on your past visits to our Service.
				</p>

				<p>17. <b>Links to Other Sites</b></p>
				<p>
					Our Service may contain links to other sites that are not operated by us. If you
					click a third party link, you will be directed to that third party’s site. We
					strongly advise you to review the Privacy Policy of every site you visit.
				</p>
				<p>
					We have no control over and assume no responsibility for the content, privacy
					policies or practices of any third party sites or services.
				</p>
				<p>
					For example, the outlined <a href="https://policymaker.io/privacy-policy/"
						>privacy policy</a
					>
					has been made using <a href="https://policymaker.io/">PolicyMaker.io</a>, a free
					tool that helps create high-quality legal documents. PolicyMaker’s
					<a href="https://policymaker.io/privacy-policy/">privacy policy generator</a>
					is an easy-to-use tool for creating a
					<a href="https://policymaker.io/blog-privacy-policy/">privacy policy for blog</a
					>, website, e-commerce store or mobile app.
				</p>
				<p>18. <b><b>Children’s Privacy</b></b></p>
				<p>
					Our Services are not intended for use by children under the age of 18 (<b
						>“Child”</b
					>
					or <b>“Children”</b>).
				</p>
				<p>
					We do not knowingly collect personally identifiable information from Children
					under 18. If you become aware that a Child has provided us with Personal Data,
					please contact us. If we become aware that we have collected Personal Data from
					Children without verification of parental consent, we take steps to remove that
					information from our servers.
				</p>
				<p>19. <b>Changes to This Privacy Policy</b></p>
				<p>
					We may update our Privacy Policy from time to time. We will notify you of any
					changes by posting the new Privacy Policy on this page.
				</p>
				<p>
					We will let you know via email and/or a prominent notice on our Service, prior
					to the change becoming effective and update “effective date” at the top of this
					Privacy Policy.
				</p>
				<p>
					You are advised to review this Privacy Policy periodically for any changes.
					Changes to this Privacy Policy are effective when they are posted on this page.
				</p>
				<p>20. <b>Contact Us</b></p>
				<p>
					If you have any questions about this Privacy Policy, please contact us by email: <b
						>arbenapura.official@gmail.com</b
					>.
				</p>
				<p style="margin-top: 2em; font-size: 0.7em;">
					This <a href="https://policymaker.io/privacy-policy/">Privacy Policy</a> was
					created for <b>http://virtualpianobyarben.online/</b> by
					<a href="https://policymaker.io">PolicyMaker.io</a> on 2023-01-28.
				</p>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.tab {
		@apply rounded-sm overflow-hidden;
		.section {
			@apply border-b border-gray-800 last:border-b-0;
			.section-header {
				@apply bg-gray-900 w-full flex items-center gap-2 p-2;
				i {
					@apply text-[25px];
				}
			}
			.section-body {
				@apply bg-gray-700 p-4;
				p {
					@apply text-sm text-slate-300;
				}
			}
		}
	}
</style>
