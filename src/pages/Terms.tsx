import React, { useState } from 'react';

export const Terms: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'terms' | 'privacy'>('privacy');

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-mobile-p md:p-6">
      {activeSection === 'privacy' ? (
        <div className="p-6 sm:p-mobile-p md:p-6">
          <div className="text-center mb-8 sm:mb-4">
            <h1 className="text-3xl font-bold mb-2 sm:text-2xl md:text-3xl">We care about your Privacy</h1>
            <p className="max-w-3xl mx-auto text-center text-gray-600 sm:text-sm md:text-base">
              Your personal information is Paramount to us at BlackSight AI. We respect our users data and keep their personal information Secure
            </p>
          </div>
          
          <div className="mb-8 sm:mb-4">
            <button 
              onClick={() => setActiveSection('privacy')}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2 sm:px-2 sm:py-1 md:px-4 md:py-2"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setActiveSection('terms')}
              className="text-blue-500 px-4 py-2 rounded sm:px-2 sm:py-1 md:px-4 md:py-2"
            >
              Terms of use
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
            <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">Introduction</div>
            <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
              This Privacy Policy explains how BlackSight AI ["we", "us" or "our"] collects, uses, and protects your personal data when you use our services and website.
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
            <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">Information We Collect</div>
            <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
              <p>We may collect:</p>
              <ul className="list-disc pl-5 sm:pl-4 md:pl-5">
                <li className="mb-1 sm:text-sm md:text-base">Personal information (name, email, contact info)</li>
                <li className="mb-1 sm:text-sm md:text-base">Usage data (IP address, device, browser type)</li>
                <li className="mb-1 sm:text-sm md:text-base">Customer content and interactions within the platform</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
            <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">How We Use Your Information</div>
            <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
              <p>We do not sell your personal data. We may share it with:</p>
              <ul className="list-disc pl-5 sm:pl-4 md:pl-5">
                <li className="mb-1 sm:text-sm md:text-base">Service providers (e.g., cloud storage, analytics)</li>
                <li className="mb-1 sm:text-sm md:text-base">Legal authorities when required</li>
                <li className="mb-1 sm:text-sm md:text-base">In corporate transactions (e.g., merger or acquisition)</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
            <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">Data Sharing and Disclosure</div>
            <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
              <p>You may use our Services only for lawful purposes. You agree not to:</p>
              <ul className="list-disc pl-5 sm:pl-4 md:pl-5">
                <li className="mb-1 sm:text-sm md:text-base">Violate any applicable laws</li>
                <li className="mb-1 sm:text-sm md:text-base">Upload malicious content</li>
                <li className="mb-1 sm:text-sm md:text-base">Interfere with the functionality of the Services, authorities and other interested parties</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
  <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">Introduction</div>
  <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
    This Privacy Policy explains how BlackSight AI ["we", "us" or "our"] collects, uses, and protects your personal data when you use our services and website.
  </div>
</div>

<div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
  <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">Information We Collect</div>
  <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
    <p>We may collect:</p>
    <ul className="list-disc pl-5 sm:pl-4 md:pl-5">
      <li className="mb-1 sm:text-sm md:text-base">Personal information (name, email, contact info)</li>
      <li className="mb-1 sm:text-sm md:text-base">Usage data (IP address, device, browser type)</li>
      <li className="mb-1 sm:text-sm md:text-base">Customer content and interactions within the platform</li>
    </ul>
  </div>
</div>

<div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
  <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">How We Use Your Information</div>
  <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
    <p>We do not sell your personal data. We may share it with:</p>
    <ul className="list-disc pl-5 sm:pl-4 md:pl-5">
      <li className="mb-1 sm:text-sm md:text-base">Service providers (e.g., cloud storage, analytics)</li>
      <li className="mb-1 sm:text-sm md:text-base">Legal authorities when required</li>
      <li className="mb-1 sm:text-sm md:text-base">In corporate transactions (e.g., merger or acquisition)</li>
    </ul>
  </div>
</div>

<div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
  <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">Data Sharing and Disclosure</div>
  <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
    <p>You may use our Services only for lawful purposes. You agree not to:</p>
    <ul className="list-disc pl-5 sm:pl-4 md:pl-5">
      <li className="mb-1 sm:text-sm md:text-base">Violate any applicable laws</li>
      <li className="mb-1 sm:text-sm md:text-base">Upload malicious content</li>
      <li className="mb-1 sm:text-sm md:text-base">Interfere with the functionality of the Services, authorities and other interested parties</li>
    </ul>
  </div>
</div>

<div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
  <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">Cookies and Tracking</div>
  <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
    We use cookies to personalize content, analyze traffic, and improve performance. You can adjust your browser settings to refuse cookies.
  </div>
</div>

<div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
            <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">Cookies and Tracking</div>
            <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
              We use cookies to personalize content, analyze traffic, and improve performance. You can adjust your browser settings to refuse cookies.
            </div>
          </div> 

          
<div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
  <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">Data Security</div>
  <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
    We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, or destruction.
  </div>
</div>

<div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
  <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">Data Retention</div>
  <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
    We retain personal data as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
  </div>
</div>

<div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
  <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">Your Rights</div>
  <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
    <p>Depending on your jurisdiction, you may have rights to:</p>
    <ul className="list-disc pl-5 sm:pl-4 md:pl-5">
      <li className="mb-1 sm:text-sm md:text-base">Access your data</li>
      <li className="mb-1 sm:text-sm md:text-base">Correct inaccurate information</li>
      <li className="mb-1 sm:text-sm md:text-base">Delete your data</li>
      <li className="mb-1 sm:text-sm md:text-base">Object to or restrict processing</li>
      <li className="mb-1 sm:text-sm md:text-base">File a complaint with a data protection authority</li>
    </ul>
  </div>
</div>

<div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
  <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">International Transfer</div>
  <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
    Your data may be transferred and stored outside your country of residence, where data protection laws may differ.
  </div>
</div>

<div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
  <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">Change to this Policy</div>
  <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
    We may update this Privacy Policy from time to time. We will notify you of significant changes through the website or by email.
  </div>
</div>

<div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
  <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">Contact Us</div>
  <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
    For questions or concerns about this policy, contact us at: blacksightai@gmail.com
  </div>
</div>
          
          
        </div>

        
      ) : (
        <div className="p-6 sm:p-mobile-p md:p-6">
          <div className="text-center mb-8 sm:mb-4">
            <h1 className="text-3xl font-bold mb-4 sm:text-2xl md:text-3xl">Terms of Use</h1>
          </div>
          
          <div className="mb-8 sm:mb-4">
            <button 
              onClick={() => setActiveSection('privacy')}
              className="text-blue-500 px-4 py-2 rounded mr-2 sm:px-2 sm:py-1 md:px-4 md:py-2"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setActiveSection('terms')}
              className="bg-blue-500 text-white px-4 py-2 rounded sm:px-2 sm:py-1 md:px-4 md:py-2"
            >
              Terms of use
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
            <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">Introduction</div>
            <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
              <ul className="space-y-4 sm:space-y-2 md:space-y-4">
                <li className="sm:text-sm md:text-base">1.1. "Customer" shall mean any person who accepts this Agreement, and who uses our software, products, services, interact with our websites, unless that person accepts it on behalf of a company, in which case "Customer" designates the entity which can be a company, a government organization (non-exclusive list), BlackSight and Customer are each referred to in this Agreement as a "Party" and collectively as the "Parties"</li>
                <li className="sm:text-sm md:text-base">1.2. "End Users" means the customers of the Customer.</li>
                <li className="sm:text-sm md:text-base">1.3. "BlackSight Software" shall mean, collectively or individually, the software (JavaScript library) created/ designed by BlackSight that the Customer can install on his/her web platform to access the services provided by BlackSight — such as user membership, user authentication and payments via Stripe, provided to the Customer(s) on a subscription basis for the Purpose, including the BlackSight Dashboard, the application program interfaces (APIs).</li>
                <li className="sm:text-sm md:text-base">1.4. "BlackSight Dashboard" shall mean the online portal through which the Customer controls settings, may select Customer's Plan, any other Services and monitors usage of the Customer's Account.</li>
                <li className="sm:text-sm md:text-base">1.5. "BlackSight Services" shall mean our software, products, services, websites including but not limited to BlackSight.co and app.BlackSight.co).</li>
                <li className="sm:text-sm md:text-base">1.6. "Updates" shall mean enhancements, bug fixes, updates and new versions made to the BlackSight Software by BlackSight and provided to the Customer by BlackSight.</li>
                <li className="sm:text-sm md:text-base">1.7. "Applicable Laws" shall mean all laws, regulations, regulations, orders, administrative directives, treaties, conventions and / or judicial or administrative decisions of any governing body having jurisdiction over the Services, the Customer and/or the Customer's use of the Services.</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
            <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">Agreement Between You and BlackSight</div>
            <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
              <ul className="space-y-4 sm:space-y-2 md:space-y-4">
                <li className="sm:text-sm md:text-base">2.1. Please read the following Terms of Service (the “Terms”) carefully. By accessing our website and/or by using our services including, but not limited to our Blacksight Software and Blacksight Services, you acknowledge that you have read, understood and agree to be bound by these Terms, and the terms and conditions of our Privacy Policy, when using any Blacksight Services (collectively, the “Services”) offered by Blacksight. A company organized and existing under the laws of Delaware, or its parents, affiliates (collectively, either "Blacksight", "Blacksight", "we", "us" or "our"). The term “you” (and “your”) for purposes of these Terms, means both you in your individual capacity, and if applicable, the company or other legal entity whom you represent and on whose behalf you use the Service.</li>
                <li className="sm:text-sm md:text-base">2.2. In order to use the Service you must agree to these Terms. You may agree to the terms by clicking the “I Accept” box, or by actually using our Services. You acknowledge and agree that Blacksight will treat your use of the Service as acceptance of these Terms from the time you first use the Service.</li>
                <li className="sm:text-sm md:text-base">2.3. If you choose to enable additional functionality or features made available through the Services (“Additional Features”), you may be presented with additional terms related to the use of such Additional Features (the “Additional Terms”). By using the Additional Features, you agree and accept the Additional Terms. In the event of a conflict between these Terms and the Additional Terms, the Additional Terms shall govern</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
            <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">General Terms and Condition</div>
            <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
              <ul className="space-y-4 sm:space-y-2 md:space-y-4">
                <li className="sm:text-sm md:text-base">3.1. Our company is registered legally in the United States, and we have the required governmental permissions to provide our services.</li>
                <li className="sm:text-sm md:text-base">3.2. If you are an individual in the EU, please read and accept the terms Blacksight’s Data Processing Addendum, before using our websites or services.</li>
                <li className="sm:text-sm md:text-base">3.3. Our Services should only be used by adults, meaning you and your users must be at least 13-years-old or older to use it. We will delete any information we find was collected from a user under the age of 13 as quickly as possible. If you need to delete your account or delete the account of a child under the age of 13, please contact us at blacksightai@gmail.com. By using the site and our services, you represent and warrant that you are at least 13 years of age.</li>
                <li className="sm:text-sm md:text-base">3.4. You are responsible for maintaining the security of your usage to our services. The Company cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.</li>
                <li className="sm:text-sm md:text-base">3.5. You agree that to the extent you provide personal information to Blacksight it will be true, accurate, current, and complete and that you will update all personal information as necessary. The use of company logos, advertisements, web addresses, contact information, pictures of celebrities or the unauthorized use of images owned by others is prohibited.</li>
                <li className="sm:text-sm md:text-base">3.5. You are responsible for all content posted and activity that occurs under your identity.</li>
                <li className="sm:text-sm md:text-base">3.6. You may not use the Service for any illegal purpose or to violate any laws in your jurisdiction (including but not limited to copyright laws).</li>
                <li className="sm:text-sm md:text-base">3.7. You can seek removal of content posted on our website, by contacting us, We will endeavor to review such requests and to remove the content and users that we determine should be removed, in our sole discretion and in accordance with these Terms of Service and applicable law. However, by providing a mechanism for the submission of complaints, we make no promises that we will review all such complaints or that we will take any action in response to such complaints. Please be aware, however, that if the content has already been distributed to other websites or published in other media, we will not be able to recapture and delete it. Also, a back-up or residual copy of the content we remove from this website may remain on back-up servers.</li>
              </ul>
            </div>
          </div>

          <div className="mb-6 sm:mb-4">
            <div className="ml-48 border-l pl-6 sm:ml-32 md:ml-48 sm:pl-4 md:pl-6 space-y-4 sm:space-y-2 md:space-y-4">
              <p className="mb-4 sm:text-sm md:text-base">
                3.8. While most individuals who use our community/online platform have successful experiences, from time to time we do receive reports of people attempting to scam or defraud the community. 211 Verbal, physical, written or other abuse (including threats of abuse or retribution) of any Service customer, Company employee or officer will result in immediate action by the Company.
              </p>
              
              <p className="mb-4 sm:text-sm md:text-base">
                3.10. The failure of the Company to exercise or enforce any right or provision of the Terms of Service shall not constitute a waiver of such right or provision. The Terms of Service constitutes the entire agreement between you and the Company and governs your use of the Service, superseding any prior agreements between you and the Company (including, but not limited to, any prior versions of the Terms of Service).
              </p>
              
              <p className="mb-4 sm:text-sm md:text-base">
                3.11. The Company hereby grants you a non-exclusive, non-transferable, revocable, worldwide license to access and use the Services to interact with your end users ("End Users"). All rights not expressly granted to you are reserved by BlackSight.
              </p>
              
              <div className="mb-4 sm:mb-2 md:mb-4">
                <p className="mb-2 sm:text-sm md:text-base">3.12. Access to the Services by an End User shall be governed by your End User terms of service ("Your Terms"), provided that you shall be responsible for ensuring that, as between an End User, you and BlackSight:</p>
                <ul className="pl-6 mt-2 space-y-2 sm:space-y-1 md:space-y-2">
                  <li className="sm:text-sm md:text-base">a. BlackSight will at all times retain ownership of all of its intellectual property [as further described in the Section entitled "BlackSight's Intellectual Property Rights" below] and End Users are granted no rights to such intellectual property.</li>
                  <li className="sm:text-sm md:text-base">b. BlackSight makes no direct or implied warranties to End Users.</li>
                  <li className="sm:text-sm md:text-base">c. you shall not make any representation or warranties to End Users with respect to the Service, other than the representation that you have the necessary rights to allow End Users to use the Service.</li>
                  <li className="sm:text-sm md:text-base">d. BlackSight is the direct and intended beneficiary of Your Terms; and</li>
                  <li className="sm:text-sm md:text-base">e. BlackSight will not be liable to your End Users, either directly or indirectly.</li>
                  <li className="sm:text-sm md:text-base">f. As between BlackSight and you, you are responsible for ensuring that End Users do not communicate information in violation of law using the Service, and for advising them against transmitting sensitive information using the Service, including but not limited to healthcare/medical information or personally identifiable information of minors.</li>
                </ul>
              </div>
              
              <p className="mb-4 sm:text-sm md:text-base">
                3.13. Free Trial. BlackSight may offer at its discretion, a free trial of the BlackSight Software for a specified time period. During such trial period, Customer shall be bound by the terms of this Agreement and any applicable law, regulation and generally accepted practices and guidelines of the relevant jurisdiction. Any Customer data generated or input by the Customer during the free trial will be permanently lost at the expiry of the specified time period unless the Customer Upgrades his/her/its subscription to one of the paid subscription plans, BlackSight does not provide any warranty during the trial period.
              </p>
              
              <p className="mb-4 sm:text-sm md:text-base">
                3.12. Free Evaluations. From time to time, we may invite you and/or your Users to try certain features or products at no charge [called a "free trial" or evaluation period generally]. Evaluation Services may be designated or identified as beta, evaluation, trial or the like. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED IN THIS AGREEMENT, EVALUATION SERVICES ARE LICENSED FOR YOUR INTERNAL EVALUATION PURPOSES ONLY AND WE MAKE NO REPRESENTATION, WARRANTY (EXPRESS OR IMPLIED) OR INDEMNITY OF ANY KIND AND WE SHALL HAVE NO INDEMNIFICATION OBLIGATIONS NOR LIABILITY OF ANY TYPE WITH RESPECT TO ANY EVALUATION SERVICES ON ANY TRIAL, WE AND OUR AFFILIATES AND OUR LICENSORS DO NOT REPRESENT, WARRANT OR GUARANTEE THAT ANY EVALUATION SERVICES PROVIDED TO YOU DURING ANY FREE TRIAL PERIOD WILL MEET YOUR REQUIREMENTS AND (B) YOUR USE OF THE SERVICE DURING ANY FREE TRIAL PERIOD WILL BE UNINTERRUPTED, TIMELY, SECURE OR FREE FROM ERRORS. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED IN THIS AGREEMENT, YOU UNDERSTAND AND AGREE THAT YOU AND YOUR AFFILIATES HAVE NO OBLIGATION TO US AND OUR AFFILIATES FOR ANY DAMAGES ARISING OUT OF YOUR USE OF THE SERVICE DURING ANY FREE TRIAL PERIOD, ANY ACTION BY ANY OF YOUR USERS OR THIS AGREEMENT AND WE RECOMMEND THAT YOU REVIEW ALL RELEVANT EVALUATION SERVICES INFORMATION AND DOCUMENTATION DURING ANY TRIAL PERIOD TO BECOME FAMILIAR WITH THE FEATURES AND FUNCTIONS OF THE SERVICE BEFORE MAKING ANY PURCHASE DECISION. Unless otherwise stated in an Order, any Evaluation Services trial period shall automatically terminate [at our sole discretion] at the end of the trial period. We may terminate any Evaluation Services generally or you specifically at any time in our sole discretion and may never make any Evaluation Services generally available. We shall have no liability for any harm or damage arising out of or in connection with any Evaluation Services.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
            <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">Accounts</div>
            <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
              <p className="mb-4 sm:text-sm md:text-base">
                4.1. In order to use the Service, you must register with us to open a Blacksight account (“Account”). By opening an Account, you represent and warrant that: <br />
                a. you are 16 years of age or older, and that if you are less than 16 years old, your parent or legal guardian has agreed to stand behind any agreement you enter into as a participant on Blacksight; <br />
                b. all information you submit in connection with your opening and use of your Account is true, accurate, current, and complete; <br />
                c. you will promptly notify us if your information changes so that we can update our records; and <br />
                d. your use of the Service does not violate any applicable law, rule or regulation. You are responsible for maintaining this information current.
              </p>
              <p className="mb-4 sm:text-sm md:text-base">
                4.2. You are solely responsible for maintaining the security and confidentiality of the information you hold for your Account, including, without limitation, your username and password, and for any and all activity that occurs through your Account as a result of your failure to keep this information secure and confidential. You hereby agree to notify Blacksight immediately if you become aware of any unauthorized use of your Account, user name or password, or any other breach of security in connection therewith. You may be held liable for losses incurred by Blacksight or any third party due to someone else using your Account, user name or password as a result of your failing to keep your Account information secure and confidential. You are strictly prohibited from using anyone else’s Account, user name or password at any time and for any reason. Blacksight is not liable to you or any third party for your failure to comply with your obligations under this paragraph.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
            <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">Accounts</div>
            <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
              <p className="mb-4 sm:text-sm md:text-base">
                5.1. <a href="http://" className='text-blue'>Fixed fees.</a>  In order to benefit from the services offered by Blacksight, the Customer is subject to payment of the applicable service charges, payable on a subscription basis. The fees vary depending on the services provided by Blacksight. The Fee schedule and the available Subscription Plans are specified on the Site[](https://www.Blacksight.co/pricing) or communicated personally to the Customer. Fees are charged automatically on a recurring basis at the beginning of each month. By contracting with Blacksight, the Customer agrees to pay the costs in accordance with these Conditions, and the other General Conditions in force at the time of the conclusion of the contract. The charges remain valid as long as they are indicated on the Site, or as long as the customer's subscription plan lasts.
              </p>
              <p className="mb-4 sm:text-sm md:text-base">
                5.2. Billing currency and exchange rate. The currency of invoicing will depend on the Client's billing address. The currencies supported by Blacksight are: USD. Thus, The Client will be billed in USD. the Usage Fee will be calculated on the basis of a conversion of the fee incurred by the Client into USD at the exchange rate applicable at the close of business on the last business day of the quarter preceding the applicable billing date.
              </p>
              <p className="mb-4 sm:text-sm md:text-base">
                5.3. Taxes. Unless otherwise stated, all Charges exclude VAT and any other taxes, levies or duties imposed by the tax authorities. Unless otherwise specified in the Fee Schedule, the Customer is responsible for the payment of all applicable taxes, levies and duties, excluding local taxes based solely on the Company's income. In addition, we are not responsible for covering Internet service fees, surcharges and other amounts incurred as a result of the Customer's use of Blacksight and the Customer is solely responsible for covering such costs.
              </p>
              <p className="mb-4 sm:text-sm md:text-base">
                5.4. Modification of service charges. Blacksight reserves the right to change fees at its sole discretion without notice. It undertakes to systematically inform the Customer within a reasonable time. The Customer in the event of non-satisfaction has the possibility of terminating the contract within eight (8) days from the notification. If the Customer does not terminate the service contract within the time limit, he is considered to have accepted this new pricing.
              </p>
              <p className="mb-4 sm:text-sm md:text-base">
                5.5. Disclaimer. Blacksight will not be held responsible for any expired credit / debit card, insufficient funds or other charges that the Customer has incurred due to attempted debits, or for other reasons.
              </p>
              <p className="mb-4 sm:text-sm md:text-base">
                5.6. Terms of payment. The Customer agrees to pay all invoices within thirty (30) days of the date of the invoice.
              </p>
              <p className="mb-4 sm:text-sm md:text-base">
                5.7. Means of payment. In contracting with Blacksight, the Customer must provide valid credit or debit card information, and / or bank account information, and expressly agrees to authorize Blacksight and / or any other company or person acting in its name, depending on the Subscription Plan and the billing frequency chosen, to carry out the monthly or annual debit of the Usage Fees as well as all other fees related to the Services.
              </p>
              <p className="mb-4 sm:text-sm md:text-base">
                5.8. Refunds. If despite the efforts made by Blacksight to provide better service, Customers are not satisfied with the latter, and there is reason to believe that the quality of the services has been impaired by its doing, after having carefully evaluated the problem, Blacksight may at its sole discretion issue partial or full refunds to Customers.
              </p>
              <p className="mb-4 sm:text-sm md:text-base">
                5.9. Upstream of any termination of the service contract relating to the quality of the Services provided, in order to be able to claim a refund, the Customer must contact Blacksight and explain in detail the problems encountered. If after evaluation of the problem the Customer is entitled to a refund, the latter will be made using the same payment method as that used by the Customer to make the payment, unless the Customer expressly requests otherwise.
              </p>
              <div className="mb-4 sm:mb-2 md:mb-4">
                <p className="mb-2 sm:text-sm md:text-base">
                  5.10 Account Upgrades.
                </p>
                <ul className="list-decimal pl-5 space-y-2 sm:space-y-1 md:space-y-2">
                  <li className="sm:text-sm md:text-base">5.10.1 We have implemented an automated account upgrade process for our paid members who reach 100% of their usage limit. Please note that we will send two email notifications when You reach 90% and 100% of Your usage limit.</li>
                  <li className="sm:text-sm md:text-base">5.10.2 Refusing Account Upgrade. If You do not wish to be automatically upgraded, You can contact us to discuss options. We may ask You to remove inactive members or temporarily block new sign-ups to avoid going over the usage limit. Please note that You must inform us before reaching the usage limit.</li>
                  <li className="sm:text-sm md:text-base">5.10.3 Payment for Account Upgrade. If Your account is automatically upgraded, you will be charged a prorated amount for the new plan immediately. You will not be overcharged or lose any part of a previous payment.</li>
                </ul>
              </div>
            </div>


          </div>

          <div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
  <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">Termination of Services</div>
  <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
    <p className="mb-4 sm:text-sm md:text-base">
      16.1. You are solely responsible for properly canceling your account. Please email blacksightai@gmail.com to request cancellation. Your account is not considered cancelled until you receive a confirmation email from us.
    </p>
    <p className="mb-4 sm:text-sm md:text-base">
      16.2. All of your content will be inaccessible from the Service immediately upon cancellation. Within 30 days, all data will be permanently deleted from all backups and logs. This information can not be recovered once it has been permanently deleted.
    </p>
    <p className="mb-4 sm:text-sm md:text-base">
      16.3. If you cancel the Service before the end of your current paid up month, your cancellation will take effect immediately, and you will not be charged again. But there will not be any prorating of unused time in the last billing cycle.
    </p>
    <p className="mb-4 sm:text-sm md:text-base">
      16.4. Blacksight has the right to suspend or terminate your account and refuse any and all current or future use of the Service for any reason at any time. Such termination of the Service will result in the deactivation or deletion of your Account or your access to your Account, and the forfeiture and relinquishment of all content in your account. The Service reserves the right to refuse service to anyone for any reason at any time.
    </p>
    <p className="mb-4 sm:text-sm md:text-base">
      16.5. Blacksight reserves the right in its sole discretion to cease or suspend providing all or any part of the Services immediately without any notice to you, if: you breach, or threaten or intend to breach, these Terms; you test Blacksight for vulnerabilities or perform load-testing or any other activity not related to its defined use, without our prior agreement for such usage; Blacksight is required to do so under any applicable law, rule, or regulation, including, without limitation, applicable spam laws; the Service relies on data, services, or another business relationship between Blacksight and a third-party service provider, and such relationship terminates or changes in a way that affects Blacksight’s ability to continue providing the Service; continuing to provide the Service could create a substantial economic burden on Blacksight, as determined by Blacksight in its sole discretion; or continuing to provide the Service could create a security risk or material technical burden, as determined by Blacksight in its sole discretion.
    </p>
    <p className="mb-4 sm:text-sm md:text-base">
      16.6. Any of your obligations under these Terms which by their nature are intended to survive the termination of your use of the Service, shall continue to apply to you after you cease to use the Service.
    </p>
    <p className="mb-4 sm:text-sm md:text-base">
      16.7. Blacksight may notify the relevant law enforcement authorities or other third parties, of any illegal or other prohibited conduct by you, including, without limitation, your violation of these Terms or unauthorized use of the Services.
    </p>
    <p className="mb-4 sm:text-sm md:text-base">
      16.8. In the event Blacksight decides to stop offering any or all Services, Blacksight shall provide a notice in writing or email to you of not less than sixty (60) days.
    </p>
    <p className="mb-4 sm:text-sm md:text-base">
      16.9 Termination of Free Accounts for Non-Use. In the case of a free trial or our otherwise providing the Services at no cost to you, we shall have, upon your or any of your Users failing to use the Services for more than two (2) consecutive months, the right, in our sole discretion, to terminate all of your Accounts and your User Accounts; terminate your and all your Users’ access to and use of the Services; permanently delete all of Your Data from the Services without notice.
    </p>
    <p className="mb-4 sm:text-sm md:text-base">
      16.10. If your use of the Services is terminated or suspended, except to the extent prohibited by any applicable law, rule or regulation, you will immediately lose access to, and the ability to export, your Content.
    </p>
  </div>
</div>

<div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
  <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">Governance Law and Disputes</div>
  <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
    <p className="mb-4 sm:text-sm md:text-base">
      17.1. Governing Law. These Conditions are governed by the state of Delaware.
    </p>
    <p className="mb-4 sm:text-sm md:text-base">
      17.2. Dispute resolution. The parties agree that all disputes relating to the conclusion, validity, interpretation, execution or termination of this agreement shall be the subject of an amicable resolution. In the event that the amicable resolution fails, the Dispute will be subject to the exclusive jurisdiction of the Montpellier Commercial Court.
    </p>
    <p className="mb-4 sm:text-sm md:text-base">
      17.3. Severability. To the extent that any provision or part of the provisions of this Agreement would be deemed illegal, void or unenforceable, this provision must be replaced by a valid and enforceable provision the effect of which would approximate as closely as possible to the expected economic effect of the provision deemed inapplicable or invalid. Therefore the other provisions will not be affected and will remain in force and enforceable.
    </p>
    <p className="mb-4 sm:text-sm md:text-base">
      17.4. Amendment. BLACKSIGHT may at any time modify the terms of these conditions, taking into account in particular the technical and factual evolution of the regulations and technologies associated with the service. The Customer will be systematically informed by any means, and he agrees to read the new terms of the Terms of Service.
    </p>
  </div>
</div>

<div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
  <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">Third Party Websites</div>
  <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
    <p className="mb-4 sm:text-sm md:text-base">
      18.1. Our websites and Services may provide links to other websites that are not owned or operated by Blacksight (“Third Party Websites”). Blacksight provides these links to you as a convenience only, and Blacksight does not verify, make any representations concerning, or take responsibility for, such Third Party Websites, or the products or services offered through such third party websites, including, without limitation, the truthfulness, accuracy, quality, or completeness of the content of, or activities conducted on, such Third Party Websites. You should use your own independent judgment before accessing and using such Third Party Websites, or products or services offered through such third party websites.
    </p>
  </div>
</div>

<div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
  <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">Miscellaneous Legal Terms</div>
  <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
    <p className="mb-4 sm:text-sm md:text-base">
      19.1. Any notice or other communications by Blacksight relating to the Service may be made by e-mail or posting on our website, and you hereby consent to receive notices and other communications in electronic form to the extent permitted by applicable law.
    </p>
    <p className="mb-4 sm:text-sm md:text-base">
      19.2. These Terms shall not be interpreted or construed to confer any rights or remedies on any third parties, except that each Indemnified Party shall be a third-party beneficiary hereunder and accordingly, shall be entitled to directly enforce and rely upon any provision of these Terms that confers a right or remedy in favor of it.
    </p>
    <p className="mb-4 sm:text-sm md:text-base">
      19.3. Blacksight may assign or transfer its rights, or delegate any performance, under these Terms to a third party in its sole discretion. You may not assign or otherwise transfer your rights, or delegate your performance, under these Terms to any third party without in each and every case, Blacksight’s express prior written consent.
    </p>
    <p className="mb-4 sm:text-sm md:text-base">
      19.4. Blacksight will not be liable for failing or delaying performance of its obligations resulting from any condition beyond its reasonable control, including but not limited to, governmental action, acts of the common enemy, earthquake, fire, flood or other acts of God, the elements, epidemics, labor conditions, power failures, and Internet disturbances.
    </p>
  </div>
</div>

<div className="flex flex-col sm:flex-row mb-6 sm:mb-4">
  <div className="w-48 text-blue-500 font-medium flex-shrink-0 sm:w-32 md:w-48">Miscellaneous Legal Terms</div>
  <div className="flex-1 border-l pl-6 sm:pl-4 md:pl-6">
    <p className="mb-4 sm:text-sm md:text-base">
        If you have any questions about this website or these Terms of Service, please contact us at: blacksightai@gmail.com\
    </p>

  </div>
</div>
        </div>
      )}
    </div>
  );
};