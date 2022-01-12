import React, { useState } from "react";
import Head from 'next/head';
import AboutStyles from '../styles/About.module.css';
import { AsyncPaginate } from "react-select-async-paginate";

import { Bars, Puff, Oval } from 'react-loading-icons'

const SubjectOptionsManager = require("../services/SubjectOptionsManager");
const GradeOptionsManager = require("../services/GradeOptionsManager");
const CountryOptionsManager = require("../services/CountryOptionsManager");
const LessonOptionsManager = require("../services/LessonOptionsManager");
const QuestOptionsManager = require("../services/QuestOptionsManager");
import { selectCustomStyles } from "../services/SelectCustomStyle";

const about = () => {
    const [subjectOptionsManager, setSubjectOptionsManager] = useState(new SubjectOptionsManager());
    const [gradeOptionsManager, setGradeOptionsManager] = useState(new GradeOptionsManager());
    const [countryOptionsManager, setCountryOptionsManager] = useState(new CountryOptionsManager());
    const [lessonOptionsManager, setLessonOptionsManager] = useState(new LessonOptionsManager());
    const [questOptionsManager, setQuestOptionsManager] = useState(new QuestOptionsManager());

    return (
        <div>
            <Head>
                <title>About</title>
                <meta name='keywords' content='web development, programming'></meta>
            </Head>

            <div className={AboutStyles.wrapper}>

                <AsyncPaginate
                    className={AboutStyles.select_single}
                    styles={selectCustomStyles}
                    placeholder="Select subject"
                    isSearchable={false}
                    isClearable={true}
                    isDisabled={true}
                    options={subjectOptionsManager.options}
                    value={subjectOptionsManager.selectedOptions}
                    loadOptions={subjectOptionsManager.loadOptions}
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.name}
                    onChange={(item) => {
                        setSubjectOptionsManager({...subjectOptionsManager, selectedOptions: {...item}})
                    }}
                />

                <AsyncPaginate
                    className={AboutStyles.select_single}
                    styles={selectCustomStyles}
                    placeholder="Select grade"
                    isSearchable={false}
                    isClearable={true}
                    options={gradeOptionsManager.options}
                    value={gradeOptionsManager.selectedOptions}
                    loadOptions={gradeOptionsManager.loadOptions}
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.name}
                    onChange={(item) => {
                        setGradeOptionsManager({...gradeOptionsManager, selectedOptions: {...item}})
                    }}
                />

            </div>

            <br/>

            <div className={AboutStyles.wrapper}>

                <AsyncPaginate
                    className={AboutStyles.select_multi}
                    styles={selectCustomStyles}
                    placeholder="Select countries"
                    isMulti
                    isSearchable={false}
                    closeMenuOnSelect={false}
                    options={countryOptionsManager.options}
                    value={countryOptionsManager.selectedOptions}
                    loadOptions={countryOptionsManager.loadOptions}
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.name}
                    onChange={(items) => {
                        setCountryOptionsManager({...countryOptionsManager, selectedOptions: [...items]})
                    }}
                />

            </div>

            <br/>

            <div className={AboutStyles.wrapper}>

                <AsyncPaginate
                    className={AboutStyles.select_multi}
                    styles={selectCustomStyles}
                    placeholder="Search and select lessons"
                    isMulti
                    isSearchable={true}
                    closeMenuOnSelect={false}
                    options={lessonOptionsManager.options}
                    value={lessonOptionsManager.selectedOptions}
                    loadOptions={lessonOptionsManager.loadOptions}
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.name}
                    onChange={(items) => {
                        setLessonOptionsManager({...lessonOptionsManager, selectedOptions: [...items]})
                    }}
                />

                <br/>

            </div>

            <br/>

            <div className={AboutStyles.wrapper}>

                <AsyncPaginate
                    className={AboutStyles.select_multi}
                    styles={selectCustomStyles}
                    placeholder="Search and select quests"
                    isMulti
                    isSearchable={true}
                    closeMenuOnSelect={false}
                    options={questOptionsManager.options}
                    value={questOptionsManager.selectedOptions}
                    loadOptions={questOptionsManager.loadOptions}
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.name}
                    onChange={(items) => {
                        setQuestOptionsManager({...questOptionsManager, selectedOptions: [...items]})
                    }}
                />

                <br/>

            </div>

            <br/>

            <Puff stroke="#D66F5B" height={50} width={50} strokeWidth={3} speed={1.2}/>
            
        </div>
    )
}

export default about;