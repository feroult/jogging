var LABEL_COLOR = '#342E37';
var INPUT_COLOR = '#000000';
var ERROR_COLOR = '#a94442';
var HELP_COLOR = '#999999';
var BORDER_COLOR = '#444';
var DISABLED_COLOR = '#777777';
var BACKGROUND_COLOR = '#FAFFFD';
var DISABLED_BACKGROUND_COLOR = '#eeeeee';
//var HEADER_FONT = 'Roboto-Regular';
//var HEADER_FONT_BOLD = 'Roboto-Bold';
//var CONTENT_FONT = 'Bariol-Regular';
var FONT_SIZE_HEADER = 18;
var FONT_SIZE_CONTENT = 16;

var stylesheet = Object.freeze({
    fieldset: {},
    // the style applied to the container of all inputs
    formGroup: {
        normal: {
            marginBottom: 15
        },
        error: {
            marginBottom: 15
        },
    },
    container: {
        normal: {
            backgroundColor: BACKGROUND_COLOR,
            borderWidth: 1,
            borderColor: BORDER_COLOR,
            borderRadius: 5,
            //shadowColor: "black",
            //shadowOpacity: 0.5,
            //shadowRadius: 2,
            //shadowOffset: {
            //    height: 1,
            //    width: 1
            //}
        },
        error: {
            backgroundColor: BACKGROUND_COLOR,
            borderWidth: 1,
            borderColor: ERROR_COLOR,
            borderRadius: 5,
            shadowColor: "black",
            shadowOpacity: 0.5,
            shadowRadius: 2,
            shadowOffset: {
                height: 1,
                width: 1
            }
        }
    },
    controlLabel: {
        normal: {
            //fontFamily: HEADER_FONT_BOLD,
            color: LABEL_COLOR,
            fontSize: FONT_SIZE_HEADER,
            marginBottom: 6,
        },
        // the style applied when a validation error occours
        error: {
            //fontFamily: HEADER_FONT_BOLD,
            color: ERROR_COLOR,
            fontSize: FONT_SIZE_HEADER,
            marginBottom: 6,
        }
    },
    helpBlock: {
        normal: {
            color: HELP_COLOR,
            fontSize: FONT_SIZE_CONTENT,
            marginBottom: 2
        },
        // the style applied when a validation error occours
        error: {
            color: HELP_COLOR,
            fontSize: FONT_SIZE_CONTENT,
            marginBottom: 2
        }
    },
    errorBlock: {
        fontSize: FONT_SIZE_CONTENT,
        marginBottom: 2,
        color: ERROR_COLOR
    },
    textbox: {
        normal: {
            //fontFamily: CONTENT_FONT,
            color: INPUT_COLOR,
            fontSize: FONT_SIZE_CONTENT,
            marginBottom: 5,
            borderWidth: 0,
            margin: 0,
            padding: 0,
            paddingTop: 6,
            paddingLeft: 8,
            height: 32,
            textAlignVertical: 'top',

        },
        // the style applied when a validation error occours
        error: {
            //fontFamily: CONTENT_FONT,
            color: INPUT_COLOR,
            fontSize: FONT_SIZE_CONTENT,
            marginBottom: 5,
            borderWidth: 0,
            margin: 0,
            padding: 0,
            paddingTop: 6,
            paddingLeft: 8,
            height: 32,
            textAlignVertical: 'top'
        },
        // the style applied when the textbox is not editable
        notEditable: {
            fontSize: FONT_SIZE_CONTENT,
            borderRadius: 4,
            color: DISABLED_COLOR,
            backgroundColor: DISABLED_BACKGROUND_COLOR,
            marginBottom: 5,
            borderWidth: 0,
            margin: 0,
            padding: 0,
            paddingTop: 6,
            paddingLeft: 8,
            height: 32,
            textAlignVertical: 'top'
        }
    },
    checkbox: {
        normal: {
            marginBottom: 4
        },
        // the style applied when a validation error occours
        error: {
            marginBottom: 4
        }
    },
    select: {
        normal: {
            marginBottom: 4
        },
        // the style applied when a validation error occours
        error: {
            marginBottom: 4
        }
    },
    datepicker: {
        normal: {
            //fontFamily: CONTENT_FONT,
            fontSize: FONT_SIZE_CONTENT,
            color: LABEL_COLOR,
            padding: 0,
            margin: 0,
            textAlign: 'center',
        },
        // the style applied when a validation error occours
        error: {
            marginBottom: 4,
            //fontFamily: CONTENT_FONT,
            fontSize: FONT_SIZE_CONTENT,
            color: ERROR_COLOR,
            padding: 0,
            margin: 0,
            textAlign: 'center',
        }
    }
});

module.exports = stylesheet;