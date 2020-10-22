import React, { Component } from 'react';
import classes from './TagsInput.module.css';
import { WithContext as ReactTags } from 'react-tag-input';

class TagsInput extends Component {
  state = { tags: this.props.parentTags }

  handleDelete = (i) => {
    const { tags } = this.state;
    this.setState({tags: tags.filter((_, index) => index !== i)});
  }

  handleAddition = (tag) => {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleDrag = (tag, currPos, newPos) => {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    this.setState({ tags: newTags });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.tags !== prevState.tags && this.props.onChange) {
      this.props.onChange(this.state.tags);
    }
    if (this.props.parentTags !== prevProps.parentTags) {
      this.setState({tags: this.props.parentTags})
    }
  }

  render() {
    return (
      <ReactTags
        classNames={{
          tag: classes.Tag,
          tagInputField: classes.TagInputField,
          tagInput: classes.TagInput,
          remove: classes.RemoveTag,
          suggestions: classes.SuggestionsTag
        }}
        suggestions={[
          { id: 'USA', text: 'USA' },
          { id: 'Germany', text: 'Germany' },
          { id: 'Austria', text: 'Austria' },
          { id: 'Costa Rica', text: 'Costa Rica' },
          { id: 'Sri Lanka', text: 'Sri Lanka' },
          { id: 'Thailand', text: 'Thailand' }
      ]}
        tags={this.state.tags}
        name="tags"
        handleDelete={this.handleDelete}
        handleAddition={this.handleAddition}
        handleDrag={this.handleDrag}
        inputFieldPosition="inline"
      />
    )
  }
}

export default TagsInput;
