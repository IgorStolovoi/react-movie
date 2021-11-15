import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import PropTypes from "prop-types";
import { v4 as key } from "uuid";
function LanguageList({ language, onChange, laguageList }) {
  return (
    <>
      <Select
        name="language"
        value={language}
        onChange={(e) => {
          onChange(e);
        }}
        label="Age"
        input={<OutlinedInput />}
      >
        <MenuItem key={key()} value="en">
          Default Language
        </MenuItem>
        {laguageList.map((lan) => {
          return (
            <MenuItem key={key()} value={lan.iso_639_1}>
              {lan.english_name}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
}
LanguageList.propTypes = {
  language: PropTypes.string,
  onChange: PropTypes.func,
  laguageList: PropTypes.array,
};
LanguageList.defaultProps = {
  laguageList: [
    {
      value: "en",
      text: "English",
    },
  ],
};
export default LanguageList;
