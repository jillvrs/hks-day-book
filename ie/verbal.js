// Verbal reasoning bank: Aon "scales verbal" style.
// Each scenario has 3 information tabs and 12 statements answered True / False / Cannot say.
// a: "T" | "F" | "C"   e: explanation shown in review
window.VERBAL_BANK = [
{
  id: "v01", title: "Meridian Logistics",
  tabs: [
    { name: "Overview", text: "Meridian Logistics was founded in Rotterdam in 2009 by two former shipping brokers. It began as a freight-forwarding agency with four employees and today employs just over 600 people across offices in the Netherlands, Germany and Poland. The company handles road and rail freight only; it does not operate sea or air services, although it partners with carriers that do. In 2023 revenue reached €148 million, an increase of 9% on the previous year. Around 70% of revenue comes from German clients." },
    { name: "Fleet and operations", text: "Meridian owns 210 trucks and leases a further 85. All owned trucks are under five years old, and the company plans to replace its leased vehicles with electric trucks by 2028. Its Poznań hub opened in 2021 and handles 40% of all rail consignments. Deliveries within the Netherlands are guaranteed within 24 hours; cross-border deliveries carry no time guarantee." },
    { name: "Staff policy", text: "Drivers work a maximum of 48 hours per week averaged over four months. New drivers complete a six-week induction before driving unsupervised. Office staff may work remotely up to three days a week. The company has had no fatal accidents since it was founded." }
  ],
  items: [
    { s: "Meridian Logistics was founded by two people.", a: "T", e: "Overview: founded by two former shipping brokers." },
    { s: "Meridian operates air freight services.", a: "F", e: "Overview: it handles road and rail only and does not operate sea or air services." },
    { s: "Revenue grew in 2023 compared with 2022.", a: "T", e: "Overview: 2023 revenue was up 9% on the previous year." },
    { s: "Most of Meridian's revenue comes from Dutch clients.", a: "F", e: "Overview: around 70% of revenue comes from German clients." },
    { s: "Meridian owns more trucks than it leases.", a: "T", e: "Fleet: 210 owned versus 85 leased." },
    { s: "The Poznań hub is Meridian's largest hub.", a: "C", e: "The text gives the hub's share of rail consignments but never compares hubs by size." },
    { s: "Cross-border deliveries are guaranteed within 48 hours.", a: "F", e: "Fleet: cross-border deliveries carry no time guarantee." },
    { s: "Some of Meridian's owned trucks are more than five years old.", a: "F", e: "Fleet: all owned trucks are under five years old." },
    { s: "New drivers may drive unsupervised after completing their induction.", a: "T", e: "Staff: induction is completed before driving unsupervised." },
    { s: "Office staff are required to work remotely three days a week.", a: "F", e: "Staff: they MAY work remotely UP TO three days. It is an option and a maximum, not a requirement." },
    { s: "Meridian has more employees in Germany than in Poland.", a: "C", e: "Headcount by country is never given." },
    { s: "Meridian has never had an accident involving injury.", a: "C", e: "Only FATAL accidents are ruled out. Injuries are not mentioned." }
  ]
},
{
  id: "v02", title: "Alder Street Library",
  tabs: [
    { name: "Services", text: "Alder Street Library is open six days a week, closing on Mondays. It holds about 85,000 physical items and offers an e-book service available to members only. Study rooms can be booked for up to three hours per day; bookings open seven days in advance. Printing costs 10 cents per page in black and white and 40 cents in colour. The library has no café, but hot drinks are available from a machine on the ground floor." },
    { name: "Membership", text: "Membership is free for residents of the city. Non-residents pay an annual fee of €25. Members may borrow up to 12 items at a time for three weeks; items can be renewed twice unless another member has reserved them. Late fees were abolished in 2022; instead, borrowing privileges are suspended until overdue items are returned. Children under 14 need a parent or guardian to sign their application." },
    { name: "Events", text: "The library runs a weekly reading group on Thursday evenings and a coding club for teenagers on Saturday mornings. Both are free, but the coding club is limited to 15 participants per session and usually fills up within a day of bookings opening. Author talks take place roughly once a month; a small number are ticketed, with ticket income going to the library's book fund." }
  ],
  items: [
    { s: "The library is closed on Mondays.", a: "T", e: "Services: open six days a week, closing on Mondays." },
    { s: "Non-members can use the e-book service.", a: "F", e: "Services: e-books are available to members only." },
    { s: "Study rooms can be booked up to a week ahead.", a: "T", e: "Services: bookings open seven days in advance." },
    { s: "Colour printing costs four times as much as black and white.", a: "T", e: "40 cents versus 10 cents." },
    { s: "The library sells food.", a: "C", e: "The text only mentions a hot-drinks machine and no café. Food is never mentioned either way." },
    { s: "City residents pay no membership fee.", a: "T", e: "Membership: free for residents." },
    { s: "A member who already has 12 items on loan may borrow one more.", a: "F", e: "Membership: 12 items is the maximum at a time." },
    { s: "An item reserved by another member can still be renewed once.", a: "F", e: "Membership: renewal is allowed UNLESS another member has reserved the item." },
    { s: "Late fees were abolished because they were unpopular.", a: "C", e: "The abolition is stated, the reason is not." },
    { s: "The coding club is more popular than the reading group.", a: "C", e: "We know the coding club fills up, but nothing about reading-group attendance." },
    { s: "All author talks are free.", a: "F", e: "Events: a small number are ticketed." },
    { s: "The reading group meets in the evening.", a: "T", e: "Events: Thursday evenings." }
  ]
},
{
  id: "v03", title: "Northgate University admissions",
  tabs: [
    { name: "Admissions", text: "Northgate University admits undergraduates twice a year, in September and February. Applicants must hold a secondary school diploma and demonstrate English proficiency, either through a recognised test or by having completed at least two years of schooling in English. Each applicant is interviewed online by a member of faculty. The university does not require any standardised admissions test, although applicants may submit SAT or ACT scores to support their application. Decisions are communicated within four weeks of the interview." },
    { name: "Fees and scholarships", text: "Annual tuition is €18,500 for all undergraduate programmes except the Bachelor of Architecture, which costs €21,000 because of its studio costs. Fees can be paid in full or in three instalments without surcharge. Merit scholarships cover between 20% and 50% of tuition and are awarded automatically based on the admissions file; no separate application is needed. Need-based grants require a separate application and proof of household income." },
    { name: "Accommodation", text: "First-year students are guaranteed a room in university housing if they apply by 30 June. Rooms are single occupancy and cost between €520 and €780 per month depending on the building. Contracts run for ten months and cannot be cancelled early except for medical reasons. Pets are not allowed, with the exception of registered assistance animals." }
  ],
  items: [
    { s: "Students can begin their studies in February.", a: "T", e: "Admissions: intakes in September and February." },
    { s: "An applicant who has not taken an English test cannot be admitted.", a: "F", e: "Two years of schooling in English is an accepted alternative." },
    { s: "Applicants may submit ACT scores.", a: "T", e: "Admissions: SAT or ACT scores may be submitted to support an application." },
    { s: "Interviews take place on campus.", a: "F", e: "Admissions: interviews are online." },
    { s: "Applicants receive a decision within a month of applying.", a: "C", e: "Four weeks is counted from the INTERVIEW, and the text never says how long after applying the interview happens." },
    { s: "Architecture students pay higher tuition than business students.", a: "T", e: "Fees: €21,000 for Architecture, €18,500 for every other programme." },
    { s: "Paying in instalments costs more than paying in full.", a: "F", e: "Fees: instalments carry no surcharge." },
    { s: "Students must apply separately for merit scholarships.", a: "F", e: "Fees: merit scholarships are awarded automatically." },
    { s: "Need-based grants can cover the full tuition.", a: "C", e: "The text gives the range for merit scholarships only, not for need-based grants." },
    { s: "Students who apply for housing by 30 June are guaranteed a single room.", a: "T", e: "Accommodation: guaranteed a room, and all rooms are single occupancy." },
    { s: "Housing contracts can be cancelled early for any reason.", a: "F", e: "Accommodation: early cancellation only for medical reasons." },
    { s: "Most students live in university housing.", a: "C", e: "No figures on how many students live in university housing." }
  ]
},
{
  id: "v04", title: "Solaris Energy",
  tabs: [
    { name: "Company", text: "Solaris Energy designs and installs rooftop solar systems for households and small businesses in Spain and Portugal. It was founded in 2015 and has installed more than 30,000 systems. The company employs its own installation teams rather than subcontractors. In 2024 it opened a battery storage division, which now accounts for a quarter of new orders. Solaris is privately owned; its founders hold 60% of the shares and an investment fund holds the remainder." },
    { name: "Projects", text: "A typical household installation takes two days and is completed within six weeks of the contract being signed. Commercial installations take longer and are scheduled individually. Every system comes with a 12-year product warranty and a 25-year performance guarantee, which promises at least 85% of original output in year 25. Solaris monitors every installed system remotely and contacts customers if output falls unexpectedly." },
    { name: "Customers and pricing", text: "Households can buy outright or lease a system over 15 years with no upfront payment. Leasing customers pay a fixed monthly fee that does not change for the duration of the contract. Around 35% of new household customers choose leasing. Business customers cannot lease but may pay in instalments over three years. Customers who refer a friend who signs a contract receive a €200 credit." }
  ],
  items: [
    { s: "Solaris operates in more than one country.", a: "T", e: "Company: Spain and Portugal." },
    { s: "Solaris uses subcontractors for installations.", a: "F", e: "Company: it employs its own installation teams." },
    { s: "Battery storage makes up a quarter of Solaris's revenue.", a: "C", e: "A quarter of NEW ORDERS, not revenue. Order share and revenue share are different things." },
    { s: "The founders own a majority of the company.", a: "T", e: "Company: founders hold 60%." },
    { s: "A household installation is usually finished within two days of signing the contract.", a: "F", e: "The work takes two days, but it is completed within six WEEKS of signing." },
    { s: "Commercial installations take longer than household ones.", a: "T", e: "Projects: stated directly." },
    { s: "The performance guarantee lasts longer than the product warranty.", a: "T", e: "25 years versus 12 years." },
    { s: "Solaris replaces any system whose output falls.", a: "C", e: "Solaris CONTACTS customers when output falls. Replacement is never mentioned." },
    { s: "Most new household customers choose leasing.", a: "F", e: "Customers: around 35% lease, so most buy outright." },
    { s: "Leasing fees can rise with inflation.", a: "F", e: "Customers: the fee is fixed for the duration of the contract." },
    { s: "Solaris's battery division is profitable.", a: "C", e: "No financial results are given for the division." },
    { s: "A customer earns the referral credit only if the referred friend signs a contract.", a: "T", e: "Customers: credit is for referring a friend WHO SIGNS a contract." }
  ]
},
{
  id: "v05", title: "Varenne bike-share scheme",
  tabs: [
    { name: "Scheme rules", text: "The city of Varenne launched a public bike-share scheme in 2021 with 1,200 bicycles at 110 docking stations. Users register through an app and must be at least 16 years old. Bikes can be taken from any station and returned to any other; a bike left outside a station incurs a €10 penalty. Each ride is limited to a maximum of four hours, after which the bike is reported as missing. Helmets are not provided, and their use is recommended but not required." },
    { name: "Pricing", text: "A single ride costs €1.50 for the first 30 minutes and €1 for each additional 30 minutes. A monthly pass costs €12 and includes unlimited rides of up to 45 minutes; longer rides are charged at the standard additional rate. Students and residents over 65 receive a 50% discount on the monthly pass. Annual passes are not offered." },
    { name: "Results", text: "In its first full year the scheme recorded 1.9 million rides, with an average ride length of 18 minutes. About 60% of rides were taken by pass holders. Usage peaks between 8 and 9 in the morning on weekdays. The city estimates that the scheme has replaced around 4% of car trips shorter than 5 km. A survey found that the most common reason for not using the scheme was the lack of stations in the outer districts; the city plans to add 30 stations there in 2025." }
  ],
  items: [
    { s: "The scheme was the first bike-share scheme in the country.", a: "C", e: "Nothing is said about other schemes." },
    { s: "A 15-year-old can register for the scheme.", a: "F", e: "Rules: users must be at least 16." },
    { s: "Bikes must be returned to the station they were taken from.", a: "F", e: "Rules: returned to any other station." },
    { s: "Helmets are compulsory.", a: "F", e: "Rules: recommended but not required." },
    { s: "A single 40-minute ride costs €2.50.", a: "T", e: "€1.50 for the first 30 minutes plus €1 for the next (partial) 30 minutes." },
    { s: "A monthly pass holder pays nothing extra for a 40-minute ride.", a: "T", e: "Pricing: rides up to 45 minutes are included." },
    { s: "Students receive a discount on single rides.", a: "C", e: "The discount described applies to the monthly pass. Single-ride discounts are not mentioned." },
    { s: "Annual passes are cheaper per month than monthly passes.", a: "F", e: "Pricing: annual passes are not offered at all." },
    { s: "Most rides are taken by pass holders.", a: "T", e: "Results: about 60%." },
    { s: "The average ride is shorter than the free period included in a monthly pass.", a: "T", e: "18 minutes versus 45 minutes." },
    { s: "The scheme is used mostly for commuting.", a: "C", e: "A weekday morning peak suggests commuting but the text never states the purpose of rides." },
    { s: "The city will add stations in the outer districts.", a: "T", e: "Results: 30 stations planned for 2025." }
  ]
},
{
  id: "v06", title: "Harbour View Hotel staff handbook",
  tabs: [
    { name: "Shifts", text: "The hotel operates 24 hours a day. Reception staff work three shifts: morning (7:00 to 15:00), afternoon (15:00 to 23:00) and night (23:00 to 7:00). Night shifts carry a 20% pay supplement. Rotas are published two weeks in advance, and staff may swap shifts among themselves provided a supervisor approves the swap in writing. No employee may work more than six consecutive days." },
    { name: "Conduct", text: "Staff must wear the hotel uniform while on duty and may not accept cash tips at reception; tips left for housekeeping are pooled and shared equally among the housekeeping team each month. Personal mobile phones must be kept in lockers during shifts, except for staff on call. Any gift from a guest worth more than €30 must be declared to the duty manager." },
    { name: "Benefits", text: "All staff receive 25 days of paid holiday a year, rising to 28 after five years of service. Employees may stay at any hotel in the group for €40 a night, subject to availability, for up to ten nights a year. Meals during shifts are free in the staff canteen. The hotel contributes 5% of salary to a pension plan after a six-month probation period." }
  ],
  items: [
    { s: "Night-shift workers are paid more per hour than morning-shift workers.", a: "T", e: "Shifts: night shifts carry a 20% supplement." },
    { s: "Staff can swap shifts without telling anyone.", a: "F", e: "Shifts: a supervisor must approve the swap in writing." },
    { s: "An employee may work seven days in a row.", a: "F", e: "Shifts: maximum six consecutive days." },
    { s: "Reception staff may keep cash tips given to them.", a: "F", e: "Conduct: cash tips may not be accepted at reception." },
    { s: "Housekeeping tips are shared equally within the team.", a: "T", e: "Conduct: pooled and shared equally each month." },
    { s: "Staff on call may keep their phones with them.", a: "T", e: "Conduct: the locker rule has an exception for staff on call." },
    { s: "A gift worth €25 must be declared.", a: "F", e: "Conduct: only gifts worth MORE than €30 must be declared." },
    { s: "After five years, staff get three extra days of holiday.", a: "T", e: "25 days rising to 28." },
    { s: "The hotel group owns hotels outside the country.", a: "C", e: "The group's locations are never described." },
    { s: "Staff discounts can be used by family members.", a: "C", e: "The discount is described for employees. Family use is not mentioned." },
    { s: "Pension contributions begin on the first day of employment.", a: "F", e: "Benefits: contributions start after a six-month probation." },
    { s: "The hotel has more housekeeping staff than reception staff.", a: "C", e: "No staff numbers are given." }
  ]
},
{
  id: "v07", title: "Bramble Foods product recall",
  tabs: [
    { name: "Background", text: "Bramble Foods is a British producer of jams and chutneys sold in supermarkets across the UK and Ireland. Its products are made at a single factory in Devon. In March the company identified that a batch of glass jars supplied by a new supplier had a defect that could cause small fragments to break off the rim when the lid was removed." },
    { name: "Recall notice", text: "The recall covers all 340 g jars of strawberry jam and raspberry jam with best-before dates between 1 May and 31 August 2027. No other products are affected. Customers should not eat the product and can return it to any store for a full refund without a receipt. Alternatively, they can email the company a photo of the jar's batch code to receive a voucher. The company has received three reports of minor cuts; no one has needed hospital treatment." },
    { name: "Company statement", text: "Bramble Foods said it had stopped using the supplier and had inspected every batch of jars currently in the factory. The recall is expected to cost about £1.2 million, most of it in destroyed stock. The company said its other products, including its chutneys and marmalades, were unaffected and remained on sale. It added that it had informed the food safety authorities in both countries on the day the fault was discovered." }
  ],
  items: [
    { s: "The recall applies only to products sold in the UK.", a: "F", e: "Products are sold in the UK and Ireland and the recall covers all affected jars; authorities in both countries were informed." },
    { s: "The jars came from a new supplier.", a: "T", e: "Background: supplied by a new supplier." },
    { s: "Chutneys are included in the recall.", a: "F", e: "Recall notice: no other products are affected; chutneys remain on sale." },
    { s: "Customers can get a refund without a receipt.", a: "T", e: "Recall notice: full refund without a receipt." },
    { s: "The recall was triggered by customer complaints.", a: "C", e: "The company identified the defect; the text never says what prompted the discovery." },
    { s: "Someone was hospitalised because of the fault.", a: "F", e: "Recall notice: no one has needed hospital treatment." },
    { s: "The company has stopped using the supplier.", a: "T", e: "Statement: stated directly." },
    { s: "Most of the recall's cost is destroyed stock.", a: "T", e: "Statement: most of the £1.2 million is destroyed stock." },
    { s: "The supplier will pay for the recall.", a: "C", e: "Who bears the cost is not discussed." },
    { s: "Bramble notified the authorities on the day it found the fault.", a: "T", e: "Statement: informed authorities on the day the fault was discovered." },
    { s: "Strawberry jam with a best-before date in October 2027 is affected.", a: "F", e: "Recall notice: only dates between 1 May and 31 August 2027." },
    { s: "The company's sales fell after the recall.", a: "C", e: "Sales figures are not given." }
  ]
},
{
  id: "v08", title: "Remote work policy at Finch & Marlow",
  tabs: [
    { name: "Eligibility", text: "Finch & Marlow, a law firm with 240 staff, allows employees to work from home up to two days per week after completing their first six months. Trainees and reception staff are excluded. Partners may approve a third day in exceptional circumstances, for example for staff with caring responsibilities. Requests are made through the HR portal and are normally answered within five working days." },
    { name: "Equipment", text: "The firm provides a laptop and a second screen to every eligible employee; chairs and desks are not provided, but employees may claim up to £150 towards a chair once every three years. Employees must connect through the firm's VPN and may not use personal email for client matters. Printing confidential documents at home is prohibited." },
    { name: "Expectations", text: "Employees working remotely must be reachable between 9:30 and 17:00 and attend team meetings by video with their camera on. Core office days are Tuesday and Thursday, when all staff are expected to be present. Performance is assessed on output, not hours logged, and the firm says remote working will not affect promotion decisions. The policy will be reviewed after twelve months." }
  ],
  items: [
    { s: "New employees can work from home immediately.", a: "F", e: "Eligibility: only after the first six months." },
    { s: "Reception staff are excluded because they must greet visitors.", a: "C", e: "The exclusion is stated; the reason is not." },
    { s: "A third remote day can be approved by a partner.", a: "T", e: "Eligibility: partners may approve a third day in exceptional circumstances." },
    { s: "Requests are normally answered within a week.", a: "T", e: "Eligibility: within five working days." },
    { s: "The firm pays for home office desks.", a: "F", e: "Equipment: desks are not provided." },
    { s: "Employees can claim for a chair every year.", a: "F", e: "Equipment: once every three years." },
    { s: "Confidential documents may be printed at home if they are shredded afterwards.", a: "F", e: "Equipment: printing confidential documents at home is prohibited, with no exception." },
    { s: "Remote employees must keep their camera on in team meetings.", a: "T", e: "Expectations: stated directly." },
    { s: "All staff are expected in the office on Tuesdays.", a: "T", e: "Expectations: Tuesday and Thursday are core office days." },
    { s: "Remote workers are promoted less often than office-based staff.", a: "C", e: "The firm SAYS remote work will not affect promotions. The text contains no data on what actually happens." },
    { s: "The policy is permanent.", a: "C", e: "A review after twelve months is planned; whether the policy continues is unknown." },
    { s: "Finch & Marlow employs more than 200 people.", a: "T", e: "Eligibility: 240 staff." }
  ]
},
{
  id: "v09", title: "Kestrel Airlines customer notice",
  tabs: [
    { name: "Baggage", text: "Kestrel Airlines allows one cabin bag of up to 8 kg on all fares. Checked baggage is included on Flex fares (one bag up to 23 kg) but costs extra on Basic fares, with prices starting at €25 per bag when booked online and €45 at the airport. Sports equipment is carried as checked baggage at a flat rate of €40 regardless of fare. Musical instruments larger than a cabin bag require a separate seat." },
    { name: "Changes and refunds", text: "Basic fares cannot be refunded but can be changed up to two hours before departure for a fee of €50 plus any fare difference. Flex fares can be changed free of charge. Flex fares are refunded in full up to 24 hours before departure; after that, refunds are given as a voucher valid for 12 months. If Kestrel cancels a flight, all passengers are entitled to a full cash refund or a free rebooking, whichever they prefer." },
    { name: "Loyalty", text: "The Kestrel Club has three tiers: Blue, Silver and Gold. Members earn one point per euro spent on fares; points are not earned on baggage fees. Silver status requires 2,000 points in a calendar year and gives priority boarding; Gold requires 5,000 points and adds lounge access and a free checked bag on any fare. Points expire after 24 months of account inactivity." }
  ],
  items: [
    { s: "Basic fare passengers can bring a cabin bag free of charge.", a: "T", e: "Baggage: one cabin bag is allowed on all fares." },
    { s: "Checking a bag at the airport costs more than booking it online.", a: "T", e: "€45 versus from €25." },
    { s: "Kestrel flies to destinations outside Europe.", a: "C", e: "Routes are never mentioned." },
    { s: "A Basic fare can be refunded if the passenger cancels a week in advance.", a: "F", e: "Changes: Basic fares cannot be refunded." },
    { s: "A Flex fare refunded 12 hours before departure is paid as a voucher.", a: "T", e: "Changes: within 24 hours of departure, refunds are vouchers." },
    { s: "Passengers on a cancelled flight must accept a voucher.", a: "F", e: "Changes: they may choose a full cash refund or free rebooking." },
    { s: "Kestrel Club membership is free.", a: "C", e: "The cost of membership is not mentioned." },
    { s: "A member who spends €2,500 on fares in a year qualifies for Silver.", a: "T", e: "Loyalty: one point per euro, Silver needs 2,000 points." },
    { s: "Gold members get lounge access.", a: "T", e: "Loyalty: stated directly." },
    { s: "Silver members get a free checked bag on Basic fares.", a: "F", e: "Loyalty: the free checked bag is a Gold benefit." },
    { s: "Points expire two years after they are earned.", a: "F", e: "Loyalty: points expire after 24 months of INACTIVITY, not 24 months after being earned." },
    { s: "Most Kestrel passengers fly on Basic fares.", a: "C", e: "No figures on fare mix." }
  ]
},
{
  id: "v10", title: "Lumen Museum of Design",
  tabs: [
    { name: "Opening", text: "The Lumen Museum of Design is open Tuesday to Sunday from 10:00 to 18:00, with late opening until 21:00 on Fridays. It is closed on Mondays and on 25 December. Last admission is 45 minutes before closing. The museum building, a former printing works, was converted in 2012 and is fully accessible by lift." },
    { name: "Tickets", text: "Standard admission is €14. Entry is free for under-18s, students with a valid card and visitors with disabilities plus one companion. On the first Sunday of each month admission is free for everyone, and the museum usually reaches capacity by midday. Tickets bought online are €2 cheaper than at the door. An annual pass costs €40 and includes unlimited entry and a 10% discount in the shop and café." },
    { name: "Exhibitions", text: "The permanent collection covers graphic and industrial design from 1900 to the present. Temporary exhibitions change three times a year and are included in the admission price. Photography without flash is permitted in the permanent collection but may be restricted in temporary exhibitions. Guided tours run daily at 11:00 and 15:00 in English and at 13:00 in Spanish; tours are free but limited to 20 people." }
  ],
  items: [
    { s: "The museum is open on Monday public holidays.", a: "F", e: "Opening: closed on Mondays, no exception given." },
    { s: "Visitors can enter at 17:30 on a Wednesday.", a: "F", e: "Closing is 18:00 and last admission is 45 minutes before, so 17:15." },
    { s: "Visitors can enter at 20:00 on a Friday.", a: "T", e: "Friday closes at 21:00, last admission 20:15." },
    { s: "The lift was installed in 2012.", a: "C", e: "The conversion date is 2012 and the building has a lift, but when the lift was installed is not stated." },
    { s: "A 17-year-old pays €14.", a: "F", e: "Tickets: free for under-18s." },
    { s: "A standard ticket bought online costs €12.", a: "T", e: "€14 minus the €2 online saving." },
    { s: "Free Sundays are usually crowded.", a: "T", e: "Tickets: the museum usually reaches capacity by midday." },
    { s: "An annual pass is cheaper than three standard tickets bought at the door.", a: "T", e: "€40 versus 3 × €14 = €42." },
    { s: "Temporary exhibitions cost extra.", a: "F", e: "Exhibitions: included in the admission price." },
    { s: "Flash photography is allowed in the permanent collection.", a: "F", e: "Exhibitions: photography WITHOUT flash is permitted." },
    { s: "Guided tours are also offered in French.", a: "C", e: "Only English and Spanish tours are listed. Other languages are not mentioned, so we cannot rule them out from the text alone." },
    { s: "The museum café is run by an external company.", a: "C", e: "Who runs the café is not mentioned." }
  ]
},
{
  id: "v11", title: "Orion Analytics platform",
  tabs: [
    { name: "Product", text: "Orion Analytics is a data-analysis platform sold by subscription to mid-sized companies. Version 7, released in January, replaced the desktop application with a browser-based interface; the desktop version is still supported until the end of next year but receives no new features. Customers on the Standard plan can have up to 25 users; the Enterprise plan has no user limit. Both plans include unlimited data storage, but files larger than 2 GB must be uploaded through the API rather than the browser." },
    { name: "Support", text: "Support is available by email and chat from 8:00 to 20:00 Central European Time on working days. Enterprise customers also have a telephone line with a guaranteed response within one hour, 24 hours a day. Standard customers are promised a first response within one working day. Orion publishes a status page showing current incidents; in the last twelve months the platform's recorded availability was 99.95%." },
    { name: "Security", text: "All data is encrypted at rest and in transit. Customers choose to store data in either the EU or the US region at the time of sign-up; the region cannot be changed afterwards without creating a new account. Orion is certified under ISO 27001 and undergoes an independent penetration test every year. Two-factor authentication is mandatory for administrators and optional for other users." }
  ],
  items: [
    { s: "Version 7 is used through a web browser.", a: "T", e: "Product: browser-based interface." },
    { s: "The desktop version will receive new features until the end of next year.", a: "F", e: "Product: supported, but receives NO new features." },
    { s: "The Enterprise plan has no limit on the number of users.", a: "T", e: "Product: stated directly." },
    { s: "Enterprise customers pay more than Standard customers.", a: "C", e: "Prices are never mentioned." },
    { s: "Most customers store their data in the EU region.", a: "C", e: "No figures on region choice." },
    { s: "Chat support is available on Saturdays.", a: "F", e: "Support: email and chat on working days only." },
    { s: "Enterprise customers can get a response at 3 a.m.", a: "T", e: "Support: telephone line 24 hours a day." },
    { s: "The platform was unavailable for less than 1% of the past year.", a: "T", e: "99.95% availability means 0.05% unavailability." },
    { s: "Customers can move their data from the US region to the EU region within the same account.", a: "F", e: "Security: the region cannot be changed without creating a new account." },
    { s: "Orion is ISO 27001 certified.", a: "T", e: "Security: stated directly." },
    { s: "All users must use two-factor authentication.", a: "F", e: "Security: mandatory for administrators only." },
    { s: "Orion has more Standard than Enterprise customers.", a: "C", e: "Customer numbers are not given." }
  ]
},
{
  id: "v12", title: "Greenfield Marathon",
  tabs: [
    { name: "Entry", text: "The Greenfield Marathon takes place on the second Sunday of October. Entries open in March and are allocated by ballot because demand exceeds the 18,000 places available. Runners must be at least 18 on race day. The entry fee is €75, refundable only if the event is cancelled; a deferral to the following year is possible for medical reasons on payment of a €20 fee. Around 4,000 places are reserved for charity entrants, who commit to raising at least €500." },
    { name: "Race day", text: "The course is flat for the first 30 km and includes two hills in the final 12 km. There are water stations every 5 km and energy gels at 20 km and 32 km. The course closes six and a half hours after the start, after which runners still on the course are asked to move to the pavement. Finishers receive a medal and a T-shirt. The event has been held every year since 1998 except in 2020." },
    { name: "Charity", text: "Last year, charity runners raised a total of €2.6 million. The official charity partner changes every two years; the current partner is a children's hospice. Charity entrants may choose any registered charity, but only those running for the official partner receive a free training plan and a place in the charity start pen. Fundraising totals are published on the event's website in December." }
  ],
  items: [
    { s: "Everyone who applies gets a place.", a: "F", e: "Entry: places are allocated by ballot because demand exceeds supply." },
    { s: "A runner whose 18th birthday is the day after the race can take part.", a: "F", e: "Entry: must be at least 18 ON race day." },
    { s: "A runner who withdraws because of injury can get the fee back.", a: "F", e: "Entry: refund only if the event is cancelled; injury allows a paid deferral, not a refund." },
    { s: "Charity entrants must raise at least €500.", a: "T", e: "Entry: stated directly." },
    { s: "The course includes hills in its final section.", a: "T", e: "Race day: two hills in the final 12 km." },
    { s: "There are toilets at every water station.", a: "C", e: "Toilets are never mentioned." },
    { s: "The race was not held in 2020.", a: "T", e: "Race day: every year since 1998 except 2020." },
    { s: "Charity runners raised more than €2 million last year.", a: "T", e: "Charity: €2.6 million." },
    { s: "All charity entrants get a free training plan.", a: "F", e: "Charity: only those running for the official partner." },
    { s: "The official charity partner will be the same for the next ten years.", a: "F", e: "Charity: the partner changes every two years." },
    { s: "The marathon is the largest in the country.", a: "C", e: "No comparison with other races." },
    { s: "Most charity runners run for the official partner.", a: "C", e: "The split between charities is not given." }
  ]
}
];

// Full-length company packs in the exact Aon "scales verbal" layout IE uses: one company, six information
// tabs that stay on screen for the whole section, and ~49 statements that each relate to exactly one tab.
// tab: index of the tab the statement refers to (shown in the review only).
window.VERBAL_COMPANIES = [
{
  id: "c01", company: "Varga & Lund",
  tabs: [
    { name: "About the company", icon: "briefcase", paras: [
      { label: "History", text: "Varga & Lund is an outdoor-clothing company founded in Gothenburg, Sweden, in 1987 by two former ski instructors. It began by making waterproof jackets for mountain-rescue teams and sold its first products to the public in 1992. The company remains privately owned; the founding families hold a majority of the shares." },
      { label: "Operations", text: "Today the company sells in 23 countries through its own stores, selected retailers and its website. It employs around 2,400 people, roughly a third of them in production. Headquarters remain in Gothenburg." } ] },
    { name: "Products", icon: "tag", paras: [
      { label: "Range", text: "The range covers jackets, trousers, base layers, footwear and backpacks. Jackets remain the largest category by revenue. All insulated products use recycled fibre, and since 2021 every jacket has carried a lifetime repair guarantee." },
      { label: "Pricing", text: "Products are positioned in the premium segment. The company does not run seasonal discounts, although its outlet stores sell previous seasons' stock at reduced prices." } ] },
    { name: "Values", icon: "diamond", paras: [
      { label: "Be durable", text: "We design products to last for decades, and we repair rather than replace." },
      { label: "Be honest", text: "We publish the factory of origin for every product and the environmental cost of every material we use." },
      { label: "Be outside", text: "We expect everyone who works for us to spend time in the mountains, and we give every employee ten paid days a year for this purpose." } ] },
    { name: "Corporate strategy", icon: "target", paras: [
      { label: "Overall aim", text: "To be the most trusted outdoor brand in Europe by 2030." },
      { label: "New direction", text: "Following a change of chief executive two years ago, the company has decided to move the manufacturing of footwear from Asia to Portugal and to open its first stores in North America." },
      { label: "Long-term", text: "The board has stated that it has no plans to sell the company or to list it on a stock exchange." } ] },
    { name: "Locations", icon: "pin", paras: [
      { label: "Stores", text: "The company operates 64 stores, most of them in Sweden, Norway, Germany and the United Kingdom. The largest store is in Oslo. Two stores in Canada are planned for next year." },
      { label: "Production", text: "Jackets and trousers are made in the company's own factory in Estonia; footwear is currently made by partner factories in Vietnam." },
      { label: "Distribution and repairs", text: "A single distribution centre near Hamburg serves all European stores and online orders. Repairs are carried out in Gothenburg and take an average of twelve working days." } ] },
    { name: "Marketing", icon: "megaphone", paras: [
      { label: "Community", text: "The company does not use celebrity ambassadors. Instead it sponsors 40 local hiking and climbing clubs and runs free navigation courses in its stores." },
      { label: "Digital", text: "Online sales now account for 45% of revenue. The company's newsletter has 900,000 subscribers; customer data shows that newsletter subscribers return products less often than other online customers." } ] }
  ],
  items: [
    { tab: 0, s: "Varga & Lund was founded by people who had worked as ski instructors.", a: "T", e: "History: founded by two former ski instructors." },
    { tab: 0, s: "The company sold its first products to the public in the year it was founded.", a: "F", e: "Founded 1987; first public sales 1992." },
    { tab: 0, s: "Varga & Lund is listed on a stock exchange.", a: "F", e: "History: the company remains privately owned." },
    { tab: 0, s: "The founding families own more than half of the company.", a: "T", e: "History: they hold a majority of the shares." },
    { tab: 0, s: "Most of the company's employees work in production.", a: "F", e: "Operations: roughly a third work in production." },
    { tab: 0, s: "The company sells its products in more than twenty countries.", a: "T", e: "Operations: 23 countries." },
    { tab: 0, s: "The company's headquarters have moved since it was founded.", a: "F", e: "Founded in Gothenburg; headquarters remain in Gothenburg." },
    { tab: 0, s: "Varga & Lund sells its products through retailers it does not own.", a: "T", e: "Operations: through its own stores, selected retailers and its website." },
    { tab: 0, s: "The company's first customers were volunteers.", a: "C", e: "The first jackets were made for mountain-rescue teams; whether those teams were volunteers is not stated." },
    { tab: 0, s: "Varga & Lund is the largest outdoor-clothing company in Sweden.", a: "C", e: "No comparison with other companies is given." },
    { tab: 1, s: "Backpacks are part of the product range.", a: "T", e: "Range: jackets, trousers, base layers, footwear and backpacks." },
    { tab: 1, s: "Footwear generates more revenue than any other category.", a: "F", e: "Range: jackets remain the largest category by revenue." },
    { tab: 1, s: "Footwear is the smallest category by revenue.", a: "C", e: "Only the largest category is named." },
    { tab: 1, s: "The lifetime repair guarantee was introduced for every jacket in 2021.", a: "T", e: "Range: since 2021 every jacket has carried a lifetime repair guarantee." },
    { tab: 1, s: "The company runs seasonal discounts in its main stores.", a: "F", e: "Pricing: the company does not run seasonal discounts." },
    { tab: 1, s: "Outlet stores sell current-season products at reduced prices.", a: "F", e: "Pricing: outlet stores sell previous seasons' stock." },
    { tab: 1, s: "The company's products are cheaper than those of its competitors.", a: "C", e: "Premium positioning is stated, but competitors' prices are not." },
    { tab: 1, s: "Recycled fibre is used in all insulated products.", a: "T", e: "Range: stated directly." },
    { tab: 1, s: "Base layers are made from recycled fibre.", a: "C", e: "Recycled fibre is stated for insulated products only; base layers are not described." },
    { tab: 2, s: "The company prefers to repair products rather than replace them.", a: "T", e: "Be durable: we repair rather than replace." },
    { tab: 2, s: "The factory of origin is published for every product.", a: "T", e: "Be honest: stated directly." },
    { tab: 2, s: "Employees receive ten paid days a year to spend outdoors.", a: "T", e: "Be outside: ten paid days a year for this purpose." },
    { tab: 2, s: "Employees are required to take part in company hiking trips.", a: "C", e: "Company trips are never mentioned; the text speaks of paid days and an expectation to spend time in the mountains." },
    { tab: 2, s: "The company keeps the factory of origin of its products confidential.", a: "F", e: "Be honest: it publishes the factory of origin for every product." },
    { tab: 2, s: "The company has three stated values.", a: "T", e: "Be durable, be honest, be outside." },
    { tab: 3, s: "The company aims to be the most trusted outdoor brand in the world by 2030.", a: "F", e: "Overall aim: in Europe, not the world." },
    { tab: 3, s: "The chief executive changed two years ago.", a: "T", e: "New direction: following a change of chief executive two years ago." },
    { tab: 3, s: "Footwear manufacturing is moving from Asia to Portugal.", a: "T", e: "New direction: stated directly." },
    { tab: 3, s: "The company plans to open stores in North America.", a: "T", e: "New direction: its first stores in North America." },
    { tab: 3, s: "The new chief executive was recruited from a competitor.", a: "C", e: "Nothing is said about where the chief executive came from." },
    { tab: 3, s: "The board intends to list the company on a stock exchange.", a: "F", e: "Long-term: no plans to list it." },
    { tab: 3, s: "The move of footwear production was decided because of rising costs in Asia.", a: "C", e: "The decision is stated; its reason is not." },
    { tab: 3, s: "The company will stop making footwear.", a: "F", e: "Footwear manufacturing is being moved, not ended." },
    { tab: 4, s: "The company has more than 60 stores.", a: "T", e: "Stores: 64 stores." },
    { tab: 4, s: "The largest store is in Gothenburg.", a: "F", e: "Stores: the largest store is in Oslo." },
    { tab: 4, s: "Stores in Canada are already open.", a: "F", e: "Stores: two stores in Canada are planned for next year." },
    { tab: 4, s: "Jackets are made in the company's own factory.", a: "T", e: "Production: jackets and trousers are made in the company's own factory in Estonia." },
    { tab: 4, s: "Footwear is currently made in Portugal.", a: "F", e: "Production: currently made by partner factories in Vietnam." },
    { tab: 4, s: "The company owns the factories in Vietnam.", a: "F", e: "Production: they are partner factories." },
    { tab: 4, s: "Online orders in Europe are shipped from near Hamburg.", a: "T", e: "Distribution: a single distribution centre near Hamburg serves all European stores and online orders." },
    { tab: 4, s: "The company has stores in France.", a: "C", e: "Most stores are in four named countries; the other countries are not listed." },
    { tab: 4, s: "Repairs are carried out in Estonia.", a: "F", e: "Repairs are carried out in Gothenburg." },
    { tab: 4, s: "The Estonian factory also makes backpacks.", a: "C", e: "Only jackets and trousers are said to be made there." },
    { tab: 5, s: "The company uses celebrity ambassadors.", a: "F", e: "Community: it does not use celebrity ambassadors." },
    { tab: 5, s: "The company sponsors more than 30 clubs.", a: "T", e: "Community: 40 clubs." },
    { tab: 5, s: "Navigation courses are available in every store.", a: "C", e: "Courses run 'in its stores'; whether every store offers them is not stated." },
    { tab: 5, s: "Most of the company's revenue comes from online sales.", a: "F", e: "Digital: online sales are 45% of revenue." },
    { tab: 5, s: "Newsletter subscribers return products less often than other online customers.", a: "T", e: "Digital: stated directly." },
    { tab: 5, s: "The newsletter is sent weekly.", a: "C", e: "Frequency is not mentioned." },
    { tab: 5, s: "Sponsoring clubs has increased online sales.", a: "C", e: "No link between sponsorship and sales is stated." },
    { tab: 0, hard: true, s: "Fewer than a thousand of the company's employees work in production.", a: "T", e: "Roughly a third of about 2,400 is about 800, which is below a thousand." },
    { tab: 0, hard: true, s: "The founding families could be outvoted by the other shareholders.", a: "F", e: "They hold a majority of the shares." },
    { tab: 1, hard: true, s: "A jacket sold in 2020 came with a lifetime repair guarantee.", a: "C", e: "Since 2021 every jacket carries the guarantee; whether some jackets had it earlier is not stated." },
    { tab: 1, hard: true, s: "Customers can buy previous seasons' stock at a lower price.", a: "T", e: "Pricing: outlet stores sell previous seasons' stock at reduced prices." },
    { tab: 1, hard: true, s: "The company's trousers are insulated.", a: "C", e: "Only insulated products are described; which products are insulated is not." },
    { tab: 2, hard: true, s: "The company publishes the environmental cost of every product.", a: "C", e: "It publishes the environmental cost of every MATERIAL. Products are not mentioned, so this cannot be confirmed or denied." },
    { tab: 2, hard: true, s: "Employees who do not spend time in the mountains are penalised.", a: "C", e: "An expectation and paid days are stated; consequences are not." },
    { tab: 3, hard: true, s: "The decision to open stores in North America was taken by the previous chief executive.", a: "F", e: "The decision followed the change of chief executive two years ago." },
    { tab: 3, hard: true, s: "Footwear will be made in Portugal because labour costs there are lower.", a: "C", e: "The reason for the move is not given." },
    { tab: 4, hard: true, s: "A repair that takes fifteen working days is slower than the company's average.", a: "T", e: "The average is twelve working days." },
    { tab: 4, hard: true, s: "Online orders from Norway are shipped from Estonia.", a: "F", e: "All European online orders are served from the distribution centre near Hamburg." },
    { tab: 4, hard: true, s: "The company currently has no stores outside Europe.", a: "C", e: "Most stores are in four European countries and Canadian stores are planned; the rest of the current stores are not located." },
    { tab: 5, hard: true, s: "Online customers who do not subscribe to the newsletter return products more often than subscribers.", a: "T", e: "Digital: subscribers return products less often than other online customers, which is the same fact the other way round." },
    { tab: 5, hard: true, s: "Fewer than half of the company's customers subscribe to the newsletter.", a: "C", e: "900,000 subscribers is given; the number of customers is not." },
    { tab: 5, hard: true, s: "The company spends more on sponsorship than on advertising.", a: "C", e: "No spending figures are given." }
  ]
},
{
  id: "c02", company: "Marisol Foods",
  tabs: [
    { name: "About the company", icon: "briefcase", paras: [
      { label: "History", text: "Marisol Foods was founded in 1954 in Vigo, Spain, as a cannery for sardines and tuna. The founder's grandchildren still run the company. In 1998 it bought an olive-oil producer in Jaén, and olive oil is now its second product line." },
      { label: "Operations", text: "The company employs 1,850 people and sells in 31 countries. Exports account for more than half of revenue, with France and Germany as the largest export markets. The company's shares have been traded on the Madrid stock exchange since 2006, although the family retains 55% of them." } ] },
    { name: "Products", icon: "tag", paras: [
      { label: "Canned fish", text: "Sardines, tuna, mussels and anchovies, sold under the Marisol brand and under retailers' own labels. All tuna is caught by pole and line, and the company publishes the catch area on every tin." },
      { label: "Olive oil", text: "Extra virgin oils from the company's own groves in Jaén, sold mainly in Spain and Italy." },
      { label: "Ready meals", text: "Since 2022 the company has also sold a small range of ready meals based on its canned fish; these are produced by a partner in Portugal." } ] },
    { name: "Values", icon: "diamond", paras: [
      { label: "Respect the sea", text: "We only buy fish from stocks that are independently certified as sustainable." },
      { label: "Respect our people", text: "Most of our factory staff have been with us for more than ten years, and we have never made compulsory redundancies." },
      { label: "Respect the customer", text: "We never use artificial preservatives, and we list every ingredient in plain language." } ] },
    { name: "Corporate strategy", icon: "target", paras: [
      { label: "Overall aim", text: "To be the leading Spanish brand of canned fish in Europe." },
      { label: "New direction", text: "The company has decided to reduce its dependence on retailers' own-label contracts, which currently bring in a third of canned-fish revenue but very low margins, and to invest in its own brand instead." },
      { label: "Long-term", text: "The board expects olive oil to overtake canned fish as the largest product line within ten years and is buying additional groves to prepare for this." } ] },
    { name: "Locations", icon: "pin", paras: [
      { label: "Factories", text: "Two canneries in Galicia (Vigo and Ribeira) and an olive-oil mill in Jaén. The Vigo cannery is the oldest and the largest." },
      { label: "Offices", text: "Sales offices in Paris, Hamburg and Milan." },
      { label: "Logistics", text: "Finished goods are stored at a warehouse in Zaragoza, from which all deliveries in Europe are made; shipments outside Europe leave from the port of Valencia." } ] },
    { name: "Marketing", icon: "megaphone", paras: [
      { label: "Advertising", text: "The company advertises on Spanish television during the summer months and sponsors a professional cycling team." },
      { label: "Research", text: "Consumer research shows that customers under 35 buy the ready meals more often than any other age group, and that awareness of the brand outside Spain is low." },
      { label: "Digital", text: "The website sells directly to consumers in Spain only. Online sales are less than 5% of revenue." } ] }
  ],
  items: [
    { tab: 0, s: "Marisol Foods was founded as a cannery.", a: "T", e: "History: founded in 1954 as a cannery for sardines and tuna." },
    { tab: 0, s: "The founder's grandchildren own the olive groves.", a: "C", e: "The grandchildren run the company; who owns the groves is not stated." },
    { tab: 0, s: "Olive oil has been part of the business since the company was founded.", a: "F", e: "History: the olive-oil producer was bought in 1998." },
    { tab: 0, s: "More than half of revenue comes from exports.", a: "T", e: "Operations: stated directly." },
    { tab: 0, s: "France is the company's largest export market.", a: "C", e: "France and Germany are named as the largest export markets; which of the two is larger is not stated." },
    { tab: 0, s: "The company's shares can be bought on a stock exchange.", a: "T", e: "Operations: traded on the Madrid stock exchange since 2006." },
    { tab: 0, s: "The founding family owns a minority of the shares.", a: "F", e: "Operations: the family retains 55%." },
    { tab: 0, s: "The company sells in more than 30 countries.", a: "T", e: "Operations: 31 countries." },
    { tab: 0, s: "The company employs more people in Jaén than in Vigo.", a: "C", e: "Headcount by location is not given." },
    { tab: 0, s: "The company bought the olive-oil producer to reduce its dependence on fish.", a: "C", e: "The purchase is stated; the reason is not." },
    { tab: 1, s: "Mussels are the company's best-selling product.", a: "C", e: "Sales by product are not given." },
    { tab: 1, s: "All of the company's products are sold under the Marisol brand.", a: "F", e: "Canned fish: also sold under retailers' own labels." },
    { tab: 1, s: "The catch area is printed on every tin of tuna.", a: "T", e: "Canned fish: the company publishes the catch area on every tin." },
    { tab: 1, s: "Sardines are caught by pole and line.", a: "C", e: "Pole-and-line fishing is stated for tuna only." },
    { tab: 1, s: "Olive oil is sold mainly in Spain and France.", a: "F", e: "Olive oil: mainly in Spain and Italy." },
    { tab: 1, s: "The ready meals are made in the company's own factories.", a: "F", e: "Ready meals: produced by a partner in Portugal." },
    { tab: 1, s: "Ready meals were introduced before 2022.", a: "F", e: "Ready meals: sold since 2022." },
    { tab: 1, s: "The olive groves are owned by the company.", a: "T", e: "Olive oil: from the company's own groves." },
    { tab: 1, s: "The ready meals contain olive oil.", a: "C", e: "Their ingredients are not described beyond canned fish." },
    { tab: 2, s: "The company buys only fish from certified sustainable stocks.", a: "T", e: "Respect the sea: stated directly." },
    { tab: 2, s: "The company has made compulsory redundancies in the past.", a: "F", e: "Respect our people: never made compulsory redundancies." },
    { tab: 2, s: "Most factory staff have worked for the company for over a decade.", a: "T", e: "Respect our people: more than ten years." },
    { tab: 2, s: "The company's products contain no preservatives.", a: "C", e: "Only ARTIFICIAL preservatives are ruled out; natural preservatives such as salt or oil are not mentioned either way." },
    { tab: 2, s: "Ingredients are listed in plain language.", a: "T", e: "Respect the customer: stated directly." },
    { tab: 2, s: "Factory staff are paid above the industry average.", a: "C", e: "Pay is not mentioned." },
    { tab: 2, s: "The company's values include respect for the sea.", a: "T", e: "First value." },
    { tab: 3, s: "The company aims to be the leading brand of canned fish in the world.", a: "F", e: "Overall aim: the leading SPANISH brand in EUROPE." },
    { tab: 3, s: "Own-label contracts currently bring in a third of canned-fish revenue.", a: "T", e: "New direction: stated directly." },
    { tab: 3, s: "Own-label contracts are highly profitable.", a: "F", e: "New direction: very low margins." },
    { tab: 3, s: "The company intends to invest in its own brand.", a: "T", e: "New direction: stated directly." },
    { tab: 3, s: "The board expects olive oil to become the largest product line within ten years.", a: "T", e: "Long-term: stated directly." },
    { tab: 3, s: "The company is buying more olive groves.", a: "T", e: "Long-term: buying additional groves." },
    { tab: 3, s: "Olive oil is currently the company's largest product line.", a: "F", e: "It is expected to OVERTAKE canned fish, so it is not the largest yet." },
    { tab: 3, s: "The company plans to build a new cannery.", a: "C", e: "Not mentioned." },
    { tab: 4, s: "The company has two canneries.", a: "T", e: "Factories: Vigo and Ribeira." },
    { tab: 4, s: "The Ribeira cannery is larger than the Vigo cannery.", a: "F", e: "Factories: Vigo is the largest." },
    { tab: 4, s: "The Hamburg office is the largest sales office.", a: "C", e: "Office sizes are not given." },
    { tab: 4, s: "The olive-oil mill is in Galicia.", a: "F", e: "Factories: the mill is in Jaén." },
    { tab: 4, s: "Deliveries within Europe are made from Zaragoza.", a: "T", e: "Logistics: stated directly." },
    { tab: 4, s: "Shipments outside Europe leave from Vigo.", a: "F", e: "Logistics: from the port of Valencia." },
    { tab: 4, s: "The Zaragoza warehouse is owned by the company.", a: "C", e: "Ownership is not stated." },
    { tab: 4, s: "The Vigo cannery is the company's oldest factory.", a: "T", e: "Factories: the oldest and the largest." },
    { tab: 5, s: "The company advertises on television all year round.", a: "F", e: "Advertising: during the summer months." },
    { tab: 5, s: "The company sponsors a cycling team.", a: "T", e: "Advertising: stated directly." },
    { tab: 5, s: "Customers under 35 buy ready meals more often than older customers.", a: "T", e: "Research: more often than any other age group." },
    { tab: 5, s: "Brand awareness outside Spain is high.", a: "F", e: "Research: awareness outside Spain is low." },
    { tab: 5, s: "Consumers in France can buy from the company's website.", a: "F", e: "Digital: the website sells in Spain only." },
    { tab: 5, s: "Online sales account for more than 5% of revenue.", a: "F", e: "Digital: less than 5%." },
    { tab: 5, s: "Television advertising has increased sales.", a: "C", e: "No effect of advertising is stated." },
    { tab: 5, s: "The cycling sponsorship is aimed at customers under 35.", a: "C", e: "The target of the sponsorship is not stated." },
    { tab: 0, hard: true, s: "The family's shareholding has fallen since 2006.", a: "C", e: "The family retains 55% now; its earlier holding is not stated." },
    { tab: 0, hard: true, s: "Less than half of the company's revenue is earned in Spain.", a: "T", e: "Exports are more than half of revenue, so the Spanish share is below half." },
    { tab: 0, hard: true, s: "The company was founded by a grandparent of the people who run it today.", a: "T", e: "The founder's grandchildren still run the company." },
    { tab: 1, hard: true, s: "Some of the company's canned fish is sold without the Marisol name on the tin.", a: "T", e: "Canned fish is also sold under retailers' own labels." },
    { tab: 1, hard: true, s: "The company exports olive oil.", a: "T", e: "Olive oil is sold mainly in Spain and Italy, so some is sold abroad." },
    { tab: 1, hard: true, s: "The ready meals are sold under retailers' own labels.", a: "C", e: "Own labels are mentioned for canned fish only." },
    { tab: 2, hard: true, s: "The company has reduced its workforce through voluntary redundancies.", a: "C", e: "Only compulsory redundancies are ruled out." },
    { tab: 2, hard: true, s: "The company's tins list ingredients.", a: "T", e: "Respect the customer: every ingredient is listed in plain language." },
    { tab: 3, hard: true, s: "Own-label contracts bring in less than a third of the company's total revenue.", a: "T", e: "They bring in a third of CANNED-FISH revenue, and canned fish is only part of total revenue, so their share of the total is smaller than a third." },
    { tab: 3, hard: true, s: "The company expects to earn more from olive oil than from canned fish within ten years.", a: "T", e: "The board expects olive oil to overtake canned fish as the largest product line within ten years." },
    { tab: 3, hard: true, s: "The company intends to stop supplying retailers' own labels.", a: "C", e: "It intends to reduce its dependence on them; ending them is not stated." },
    { tab: 4, hard: true, s: "Olive oil sold to Italy is shipped from the port of Valencia.", a: "F", e: "All deliveries in Europe are made from the Zaragoza warehouse; Valencia handles shipments outside Europe." },
    { tab: 4, hard: true, s: "The company has more factories than sales offices.", a: "F", e: "Three factories (two canneries and a mill) and three sales offices." },
    { tab: 5, hard: true, s: "Most of the company's customers are under 35.", a: "C", e: "Under-35s buy ready meals most often; the age profile of all customers is not given." },
    { tab: 5, hard: true, s: "A customer in Germany can order from the company's website.", a: "F", e: "The website sells to consumers in Spain only." },
    { tab: 5, hard: true, s: "The company's television advertisements are in Spanish.", a: "C", e: "The language of the advertisements is not stated." }
  ]
}
];
