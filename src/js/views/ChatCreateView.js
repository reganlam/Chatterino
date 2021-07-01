import React from "react";
import BaseLayout from "../layouts/Base";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { createChat } from "../actions/chats";

// name, description, image
export default function ChatCreateView() {
	const dispatch = useDispatch();

	const user = useSelector(({ auth }) => auth.user);

	const { register, handleSubmit } = useForm();

	const onSubmit = (formData) => {
		// TESTING
		alert(JSON.stringify(formData));
		dispatch(createChat(formData, user.uid));
	};

	return (
		<BaseLayout canGoBack={true}>
			<div className="centered-view">
				<div className="centered-container">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="centered-container-form"
					>
						<div className="header">Create chat now!</div>
						<div className="subheader">
							Chat with People you know!
						</div>
						<div className="form-container">
							<div className="form-group">
								<label htmlFor="email">Name</label>
								<input
									{...register("name")}
									name="name"
									type="text"
									className="form-control"
									id="name"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="description">Description</label>
								<input
									{...register("description")}
									name="description"
									type="text"
									className="form-control"
									id="description"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="image">Image</label>
								<input
									{...register("image")}
									name="image"
									type="text"
									className="form-control"
									id="image"
								/>
							</div>
							<button
								type="submit"
								className="btn btn-outline-primary"
							>
								Create
							</button>
						</div>
					</form>
				</div>
			</div>
		</BaseLayout>
	);
}
