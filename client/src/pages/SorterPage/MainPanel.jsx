// import { useContext, useEffect, useState } from 'react';

// const MainPanel = () => {

//     const { planData, setPlanData } = useContext(AppContext);
//     const { yearOptions, setYearOptions } = useContext(AppContext);

//     const addAcademicYear = (year) => {
//         const newAcademicYear = {};
//         newAcademicYear[year + 'f'] = [];
//         newAcademicYear[year + 'w'] = [];
//         newAcademicYear[year + 'sp'] = [];
//         newAcademicYear[year + 'su'] = [];

//         const currentPlanData = [...planData];
//         currentPlanData.push(newAcademicYear);

//         sortPlanData(currentPlanData);
//         setPlanData(currentPlanData);
//         removeAddedYearOption(year);
//     }

//     // passed as prop to the AcademicYear for delete button
//     const removeAcademicYear = (year) => {
//         const newPlanData = planData.filter((academicYearData) => {
//             // allow type coercion              
//             return year !== Object.keys(academicYearData)[0].slice(0, 2) ? true : false;
//         });

//         setPlanData(newPlanData);
//         addRemovedYearOption(year);
//     }

//     // update year options upon adding academic year
//     const removeAddedYearOption = (year) => {
//         const newYearOptions = yearOptions.filter((option) => {
//             return option.value.split('/')[0] !== year;
//         })

//         setYearOptions(newYearOptions);
//     }

//     // update year options upon deleting academic year
//     const addRemovedYearOption = (year) => {
//         const newYearOptions = [...yearOptions];
//         newYearOptions.push({
//             label: `${year} & ${year + 1}`, value: `${year}/${year + 1}`
//         })

//         newYearOptions.sort((prev, next) => {
//             const prevYear = parseInt(prev.value.split('/')[0]);
//             const nextYear = parseInt(next.value.split('/')[0]);
//             if (prevYear < nextYear) return -1;
//             else if (prevYear > nextYear) return 1;
//             else return 0;
//         })

//         setYearOptions(newYearOptions);
//     }

//     useEffect(() => {
//         addAcademicYear(DEFAULT_YEAR);
//     }, []);

//     return (
//         <MainPanelContainer>
//             <InnerBackgroundContainer>

//                 <MainControls
//                     addAcademicYear={addAcademicYear}
//                 />

//                 <AcademicYearsBox>
//                     {
//                         planData.map((yearPlanData, index) => {
//                             return (
//                                 <AcademicYear
//                                     key={index}
//                                     year={parseInt(Object.keys(yearPlanData)[0].slice(0, 2))} // ex. extract 20 out of '20f'
//                                     yearPlanData={yearPlanData}
//                                     removeAcademicYear={removeAcademicYear}
//                                 />
//                             )
//                         })
//                     }
//                 </AcademicYearsBox>

//             </InnerBackgroundContainer>
//         </MainPanelContainer>
//     );
// }
// export default MainPanel;