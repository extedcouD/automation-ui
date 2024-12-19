import Tippy from "@tippyjs/react";
import React from "react";
import { GoInfo } from "react-icons/go";
import "tippy.js/animations/perspective-subtle.css";
import { inputClass, labelClass } from "./inputClass";

const FormInput = ({
	register,
	name,
	label,
	required,
	errors,
	type = "text",
	strip = false,
	disable = false,
	labelInfo = "",
}: any) => {
	const handleChange = (e: any) => {
		let value = e.target.value;
		if (strip) {
			// Replace all spaces globally
			value = value.replace(/\s+/g, "");
		}
		e.target.value = value; // Set the input field's value
	};
	const handleFocus = (e: any) => {
		e.stopPropagation();
	};

	return (
		<div className="mb-4">
			<LabelWithToolTip labelInfo={labelInfo} label={label} />
			<input
				onFocus={handleFocus}
				{...register(name, { required })}
				disabled={disable}
				id={name}
				type={type}
				className={inputClass}
				placeholder="Type here..."
				onChange={handleChange}
				onKeyDown={(e) => {
					e.stopPropagation();
				}}
			/>
			{errors[name] && (
				<p className="text-red-500 text-xs italic dark:text-red-400">
					{errors[name]?.message || "This field is required"}
				</p>
			)}
		</div>
	);
};

const FormTextInput = ({
	register,
	name,
	label,
	required,
	errors,
	type = "text",
	strip = false,
	disable = false,
	onChange,
	labelInfo = "",
}: any) => {
	const handleChange = (e: any) => {
		let value = e.target.value;
		if (strip) {
			// Replace all spaces globally
			value = value.replace(/\s+/g, "");
		}
		e.target.value = value;
		if (onChange) {
			onChange(e);
		}
	};
	const handleFocus = (e: any) => {
		e.stopPropagation();
	};

	return (
		<div className="mb-4">
			<LabelWithToolTip labelInfo={labelInfo} label={label} />
			<textarea
				onFocus={handleFocus}
				{...register(name, { required })}
				disabled={disable}
				id={name}
				type={type}
				rows={10}
				cols={100}
				className={inputClass}
				onChange={handleChange} // Apply custom onChange to handle value transformation
				onKeyDown={(e) => {
					e.stopPropagation();
				}}
			/>
			{errors[name] && (
				<p className="text-red-500 text-xs italic dark:text-red-400">
					{errors[name]?.message || "This field is required"}
				</p>
			)}
		</div>
	);
};

export { FormInput, FormTextInput };

export function LabelWithToolTip({
	label,
	labelInfo,
}: {
	label: string;
	labelInfo: string;
}) {
	return (
		<div className="flex items-center justify-between w-full">
			<label className={labelClass}>{label}</label>
			{labelInfo != "" && (
				<Tippy
					content={<LabelToolTip label={labelInfo} />}
					placement="right-start"
					animation="perspective-subtle"
					interactive={true}
				>
					<label className="text-sm font-medium text-gray-700">
						<GoInfo size={22} />
					</label>
				</Tippy>
			)}
		</div>
	);
}

export function LabelToolTip({ label }: { label: string }) {
	const formattedLabelInfo = label.split("\n").map((line, index) => (
		<React.Fragment key={index}>
			{line}
			<br />
		</React.Fragment>
	));
	return (
		<>
			<div className="relative p-2 pr-8 max-w-xs  shadow-lg bg-blue-50  backdrop-blur-lg text-white text-sm font-semibold text-center border border-white/20">
				<div className="absolute top-2 left-2">
					{/* <IoInformationCircle size={20} className="text-black" /> */}
				</div>
				<h1 className="text-black mb-1 ml-3">{formattedLabelInfo}</h1>
			</div>
		</>
	);
}
