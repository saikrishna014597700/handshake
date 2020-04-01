import React from "react";
import { shallow, mount, render } from "../../enzyme";
import "jest-enzyme";

import CompanyDashboard from "../components/Home/CompanyDashboard";

describe("Our test suite", () => {
  it("renders all the mocked animal options", () => {
    const companyJobPostings = [
      {
        jobId: 2,
        jobTitle: "Software Developer",
        applicationDeadline: "2020-02-18T00:00:00.000Z",
        jobLocation: "Dublin",
        postingDate: "2020-02-18T00:00:00.000Z",
        salary: "10000",
        jobdescription:
          "Human Resources Administrative Assistant I will play a key role as part of a small but nimble HR team. You will provide support for various HR employee programs while ensuring compliance of company policies and local, state and federal employment laws. The Human Resources Administrative Assistant I position requires a high level of organization, attention to detail, problem solving, maintaining confidentiality and the ability to execute on human resource processes.A successful candidate will rapidly learn and develop the foundations for a career in HR while at the same time developing other highly important skills such as program and project management.",
        jobCategory: "Full Time",
        fk_companyId: 1,
        duties:
          "Our ideal candidate exhibits a can-do attitude and approaches his or her work with vigor and determination. The main responsibilities as the Human Resources Administrative Assistant I will be to maintain and update employee records, as well as manage various HR documents and internal databases.",
        qualifications:
          "Human Resource or Communications majors preferred\n1 year of clerical office experience is desired.\nSHRM student certification and/or actively participating in SHRM@ SJSU preferred",
        requirements:
          "Proficient in Microsoft Office software, including Word, Excel, Outlook, and PowerPoint. Knowledge in ADP Workforce Now is a bonus.\nMust be able to work with a diverse staff and clientele.\nMust have excellent data entry skills and be detailed oriented.\nMust be able to maintain confidentiality regarding all personnel matters.",
        companyId: 1,
        companyName: "Tesla, Inc.",
        companyPassword: "tesla",
        email: "tesla@gmail.com",
        location: "333 Santana Row #1015, San Jose, CA 95128",
        description:
          "Tesla was founded in 2003 by a group of engineers who wanted to prove that people didn’t need to compromise to drive electric – that electric vehicles can be better, quicker and more fun to drive than gasoline cars. Today, Tesla builds not only all-electric vehicles but also infinitely scalable clean energy generation and storage products. Tesla believes the faster the world stops relying on fossil fuels and moves towards a zero-emission future, the better.sasasasasasasaq",
        phoneNumber: "669225941223",
        profilePic: null,
        websiteUrl: "www.tesla.ind",
        comapnySize: "3000-4000 Employess",
        shortDesc: "Public",
        founders: "Elon Muskk",
        founderInfo:
          "Elon Reeve Musk FRS is an engineer, industrial designer, and technology entrepreneur. He is a citizen of South Africa, Canada and the United States, and is the founder, CEO and chief engineer/designer",
        availPostions: "Software Developer, QA, Business Analyst",
        companyProfilePic: null
      },
      {
        jobId: 14,
        jobTitle: "Performance Engineering Intern",
        applicationDeadline: "2020-03-19T00:00:00.000Z",
        jobLocation: "SFO",
        postingDate: "2020-03-12T00:00:00.000Z",
        salary: "$50 per hour",
        jobdescription:
          "Perform load tests to validate system performance and stability.  Analyze tests results and work with Developers and Engineers to perform bug fixes.  Provide technical assistance to improve system performance, capacity, reliability and scalability.",
        jobCategory: "Internship",
        fk_companyId: 1,
        duties: "Able to do automated scripts",
        qualifications: "Masters in Software Engineering",
        requirements: "2 years of related experience",
        companyId: 1,
        companyName: "Tesla, Inc.",
        companyPassword: "tesla",
        email: "tesla@gmail.com",
        location: "333 Santana Row #1015, San Jose, CA 95128",
        description:
          "Tesla was founded in 2003 by a group of engineers who wanted to prove that people didn’t need to compromise to drive electric – that electric vehicles can be better, quicker and more fun to drive than gasoline cars. Today, Tesla builds not only all-electric vehicles but also infinitely scalable clean energy generation and storage products. Tesla believes the faster the world stops relying on fossil fuels and moves towards a zero-emission future, the better.sasasasasasasaq",
        phoneNumber: "669225941223",
        profilePic: null,
        websiteUrl: "www.tesla.ind",
        comapnySize: "3000-4000 Employess",
        shortDesc: "Public",
        founders: "Elon Muskk",
        founderInfo:
          "Elon Reeve Musk FRS is an engineer, industrial designer, and technology entrepreneur. He is a citizen of South Africa, Canada and the United States, and is the founder, CEO and chief engineer/designer",
        availPostions: "Software Developer, QA, Business Analyst",
        companyProfilePic: null
      },
      {
        jobId: 15,
        jobTitle: "Quality Assurance Engineer ",
        applicationDeadline: "2020-03-23T00:00:00.000Z",
        jobLocation: "San Jose",
        postingDate: "2020-03-12T00:00:00.000Z",
        salary: "$47 per hour",
        jobdescription:
          "responsible for assessing the quality of specifications and technical design documents in order to ensure timely, relevant and meaningful feedback. They are involved in planning and implementing strategies for quality management and testing.",
        jobCategory: "Full Time",
        fk_companyId: 1,
        duties:
          "Reviewing quality specifications and technical design documents to provide timely and meaningful feedback.",
        qualifications: "Bachelors Degree",
        requirements: "1 years of relative experience",
        companyId: 1,
        companyName: "Tesla, Inc.",
        companyPassword: "tesla",
        email: "tesla@gmail.com",
        location: "333 Santana Row #1015, San Jose, CA 95128",
        description:
          "Tesla was founded in 2003 by a group of engineers who wanted to prove that people didn’t need to compromise to drive electric – that electric vehicles can be better, quicker and more fun to drive than gasoline cars. Today, Tesla builds not only all-electric vehicles but also infinitely scalable clean energy generation and storage products. Tesla believes the faster the world stops relying on fossil fuels and moves towards a zero-emission future, the better.sasasasasasasaq",
        phoneNumber: "669225941223",
        profilePic: null,
        websiteUrl: "www.tesla.ind",
        comapnySize: "3000-4000 Employess",
        shortDesc: "Public",
        founders: "Elon Muskk",
        founderInfo:
          "Elon Reeve Musk FRS is an engineer, industrial designer, and technology entrepreneur. He is a citizen of South Africa, Canada and the United States, and is the founder, CEO and chief engineer/designer",
        availPostions: "Software Developer, QA, Business Analyst",
        companyProfilePic: null
      },
      {
        jobId: 19,
        jobTitle: "Software Engineering Intern",
        applicationDeadline: "2020-03-27T00:00:00.000Z",
        jobLocation: "Software Engineering Inter",
        postingDate: "2020-03-13T00:00:00.000Z",
        salary: "$20 per hour",
        jobdescription: "Software Engineering Inter",
        jobCategory: "Internship",
        fk_companyId: 1,
        duties: "Software Engineering Inter",
        qualifications: "Masters",
        requirements: "2 years of experience",
        companyId: 1,
        companyName: "Tesla, Inc.",
        companyPassword: "tesla",
        email: "tesla@gmail.com",
        location: "333 Santana Row #1015, San Jose, CA 95128",
        description:
          "Tesla was founded in 2003 by a group of engineers who wanted to prove that people didn’t need to compromise to drive electric – that electric vehicles can be better, quicker and more fun to drive than gasoline cars. Today, Tesla builds not only all-electric vehicles but also infinitely scalable clean energy generation and storage products. Tesla believes the faster the world stops relying on fossil fuels and moves towards a zero-emission future, the better.sasasasasasasaq",
        phoneNumber: "669225941223",
        profilePic: null,
        websiteUrl: "www.tesla.ind",
        comapnySize: "3000-4000 Employess",
        shortDesc: "Public",
        founders: "Elon Muskk",
        founderInfo:
          "Elon Reeve Musk FRS is an engineer, industrial designer, and technology entrepreneur. He is a citizen of South Africa, Canada and the United States, and is the founder, CEO and chief engineer/designer",
        availPostions: "Software Developer, QA, Business Analyst",
        companyProfilePic: null
      }
    ];

    const wrapper = render(<CompanyDashboard options={companyJobPostings} />);
    expect(wrapper.find(".wrapper")).toHaveLength(companyJobPostings.length);
  });

  //   it("renders no animal options", () => {
  //     const animals = [];
  //     const wrapper = shallow(<CompanyDashboard options={animals} />);

  //     expect(wrapper.find(".empty").exists()).toBe(true);
  //   });

  //   it("renders a single animal option", () => {
  //     const animals = ["duck"];
  //     const wrapper = mount(<CompanyDashboard options={animals} />);

  //     expect(
  //       wrapper.contains(
  //         <li key="duck" className="value">
  //           duck
  //         </li>
  //       )
  //     ).toBeTruthy();
  //   });

  //   it("renders correct text in animal option", () => {
  //     const animals = ["duck", "bear", "whale"];
  //     const wrapper = mount(<CompanyDashboard options={animals} />);

  //     expect(wrapper.find(".value").get(0).props.children).toEqual("duck");
  //   });
});
