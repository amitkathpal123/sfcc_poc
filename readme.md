
# Team Project

### Requirements
A website wants to collect data related to beauty. They want to offer certain promotion based on this data.	
* Create four beauty profile attributes on Profile – skin tone, hair color, eye color, skin type.
* User should be able to select from pre-defined list of these profile attributes. Save it during user registration. These are non-mandatory fields.
* Create promotions targeting any two beauty concerns that the user has saved in their profile. 
* Promotion should be like “20% product discount on all products under category “Hair” if user has saved beauty profile against “hair color”.
* Place an order using this promotion.
A client wants to build a website for adult users only. The website has certain section of landing pages available to only those who are 18 years and above. Develop a site in which a particular landing page is visible to certain segment of customer only.

### Approach
* We added custom attributes to user's profile (via BM) using which we will capture the four beauty attributes. This required changes in the registration flow, profile card and Edit Profile. 
* The pre-defined value for these custom attributes was populated from a newly added attribute "beautyAttributes" under Custom Site Preferences. We defined a JSON value there which would populate the values which show up in the drop down for the beauty attributes
* We created 6 dynamic Customer Groups which will categorize customers based on the beauty attributes selection. When the user registers or edits his profile, he can choose to update the beauty attributes. Based on his profile, we group the user under the appropriate Customer Group
* We created a Promotion which will give 20% off to the user on the Products
* We create a campaign and associated the Customer Groups and Promotion to the campaign. This will enable the customers who fall under any one of the dynamic customer group to be eligible for the 20% off promotion.

### Business Manager changes
* Create 6 customer groups (Refer 6CustomerGroups.pdf) - HairAndEyeColor, HairAndSkinType, HairAndSkinTone, SkinToneAndEyeColor, SkinToneAndSkinType, EyeColorAndSkinType
* Create 20OffBeautyProducts promotion (Refer Promotion.pdf) 
* Create campaign and associate with the 6 customer groups and the Promotion created above (Refer Campaign_1 and Campaign_2.pdf)
* Add custom attributes (Administration >  Site Development >  System Object Types)
  * Site Preferences :- In "Attribute Definitions", add beautyAttributes. In "Attribute Grouping", group the new attribute under storefront configs. In Merchant Tools > Site Preferences > Custom Site Preference Groups > Storefront Configurations > Populate the value for beautyAttributes from beautyAttributesPreferences.json
  * Profile :- Add eyecolor, skincolor, skintone, skintype attributes. Group them under new group "beautyAttributes"
* All the test data or settings required for the above changes are located in testdata folder

### Tasks
* Registration Form Changes :- Changes were done to add the 4 custom optional attributes in the registration flow.
  * Changes to add the 4 new optional beauty attributes. Files changed :- registerForm.isml, Login.js
* Profile Card changes :- Changes were done to show the beauty attributes on the profile information
  * Changes to display the value attributes :- editProfileForm.isml, Account.js
* Edit Profile :- Changes were done to update the beauty attributes via Edit Profile
  * Changes to update the beauty attributes in the profile :- Account.js, profile.xml, profileCard.isml
 
### Setup
1. Clone the repo outside of the base SFRA cartridge
2. Run `npm install`
3. Resolve any issues. Possibly run `npm install node-sass`
4. Run `npm run build`
5. Import content and objects
  * Import content from `imports/content` into `Merchant Tools >  Content >  Import & Export`
  * Import objects from `imports/objects` into `Administration >  Site Development >  Import & Export`
6. Upload the cartridge with `npm run uploadCartridge`
