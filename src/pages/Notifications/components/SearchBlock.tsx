import React, {useCallback, useEffect, useState} from "react";
import {Input} from "antd";

import ExportNotifications from "./ExportNotifications";

import classes from "../Notifications.module.scss";


const {Search} = Input;

interface SearchBlockProps {
    onSearch: (value: string) => void;
    count?: number;
    value: string;
    searchPayload: any;
}

const SearchBlock: React.FC<SearchBlockProps> = ({onSearch, count, value, searchPayload}) => {
    const [inputValue, setValue] = useState(value);

    useEffect(() => {
        setValue(value);
    }, [value]);

    const onChange = useCallback(({target: {value}}) => {
        setValue(value);
    }, [setValue]);

    return (
        <div className={classes.searchWrap}>
            <div className={classes.search}>
                <Search
                    placeholder="Search"
                    onChange={onChange}
                    onSearch={onSearch}
                    value={inputValue}
                    loading={false}
                    enterButton
                    size="large"
                />
            </div>
            <div className={classes.exportWrap}>
                <div className="d-flex">
                    <div className="mar-right-5">
                        <span>{count}</span>
                    </div>
                    <div>
                        <span>alerts</span>
                    </div>
                </div>
                <div>
                    <ExportNotifications searchPayload={searchPayload}/>
                </div>
            </div>
        </div>
    );
};

export default SearchBlock;
