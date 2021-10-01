import React, {useEffect, useRef} from "react";
import {Editor} from "@tinymce/tinymce-react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import {selectUserState} from "../../../../store/selectors";
import {userAC} from "../../../../store/branches/user/actionCreators";
import {LoadingStatus} from "../../../../store/status";
import Spinner from "../../../../components/Spinner";
import HeaderForm from "./HeaderForm";

const CssPage: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const editorRef = useRef(null);
    const {support_contacts, status} = useSelector(selectUserState);

    const onSubmit = () => {
        if (editorRef.current) {
            const values = editorRef.current.getContent();
            dispatch(userAC.addSupportContact({css: values}));
        }
    };
    const handleCancel = () => {
        history.push("/sites");
    };

    useEffect(() => {
        dispatch(userAC.fetchSupportContacts());

        return () => {
            dispatch(userAC.setSupportContacts(null));
        };
    }, [dispatch]);

    if (status === LoadingStatus.LOADING) {
        return <Spinner/>;
    }

    return (
        <div>
            <HeaderForm onCancel={handleCancel} onSubmit={onSubmit}/>
            <Editor
                apiKey="jtme9mnpiyg915esclf0o6zadgk5f8cely7knkxum9u3q05k"
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={support_contacts?.css}
                init={{
                    contextmenu: "link image imagetools table configurepermanentpen",
                    plugins: "bbcode code, | code, | pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
                    toolbar: "undo redo | bold italic underline | code",
                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    height: "80vh",
                    mode: "textareas",
                    theme_advanced_buttons1: "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect",
                    theme_advanced_buttons2: "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
                    theme_advanced_buttons3: "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
                    theme_advanced_buttons4: "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak",
                    theme_advanced_toolbar_location: "top",
                    theme_advanced_toolbar_align: "left",
                    theme_advanced_statusbar_location: "bottom",
                    theme_advanced_resizing: true,
                }}
            />
        </div>
    );
};
export default CssPage;

