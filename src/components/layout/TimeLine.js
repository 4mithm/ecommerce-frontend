import React, { useState } from "react";
import HorizontalTimeline from "react-horizontal-timeline";

export default function TimeLine() {
      const value="option2"

	const checkpoints = [
                  "option1","option2","option3","option4","option5"
	];

	return (
		<div className="root-div">
			<div style={{
				width: "60%",
				height: "100px",
				margin: "0 auto"
			}}>
				<HorizontalTimeline
					styles={{ outline: "#DFA867", foreground: "#19295C" }}
					index={value}
					values={checkpoints}
				/>
			</div>
		</div>
	);
}


