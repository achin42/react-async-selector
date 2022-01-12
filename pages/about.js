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

const about = () => {
    const [subjectOptionsManager, setSubjectOptionsManager] = useState(new SubjectOptionsManager());
    const [gradeOptionsManager, setGradeOptionsManager] = useState(new GradeOptionsManager());
    const [countryOptionsManager, setCountryOptionsManager] = useState(new CountryOptionsManager());
    const [lessonOptionsManager, setLessonOptionsManager] = useState(new LessonOptionsManager());
    const [questOptionsManager, setQuestOptionsManager] = useState(new QuestOptionsManager());

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          color: state.isSelected ? 'white' : 'black',
          background: state.isFocused? '#EEF7FF' : state.isPressed? '#D4EAFF' : state.isSelected ? '#4EA6FF' : 'white',
          padding: 10,
        }),
        control: (provided, state) => ({
            ...provided,
            background: state.isDisabled? '#FCFBF9' : state.focused? '#EFF7FF' : '#F9FCFF',
            color: 'pink',
            border: '1px solid #EFF7FF',
            "&:hover": {
                border: '1px solid #D4EAFF'
            },
            "&:active": {
                border: '1px solid #D4EAFF'
            }
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: 'black',
        }),
        indicatorSeparator: (provided, state) => ({
            ...provided,
            background: state.focused? '#F9FCFF' : '#D4EAFF',
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: '#BCBCBC',
        }),
        multiValue: (provided, state) => ({
            ...provided,
            background: '#4EA6FF',
        }),
        multiValueLabel: (provided, state) => ({
            ...provided,
            color: 'white',
        }),
        multiValueRemove: (provided, state) => ({
            ...provided,
            color: '#D4EAFF',
            "&:hover": {
                color: '#4EA6FF',
                background: '#D4EAFF'
            }
        }),
    }

    return (
        <div>
            <Head>
                <title>About</title>
                <meta name='keywords' content='web development, programming'></meta>
            </Head>

            <div className={AboutStyles.wrapper}>

                <AsyncPaginate
                    className={AboutStyles.select_single}
                    styles={customStyles}
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
                    styles={customStyles}
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
                    styles={customStyles}
                    placeholder="Select countries"
                    styles={customStyles}
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
                    styles={customStyles}
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
                    styles={customStyles}
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