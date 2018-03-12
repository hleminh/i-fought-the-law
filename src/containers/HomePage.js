import React, {Component} from 'react';
import SearchBar from '../components/SearchBar';
import {Container, Grid, Segment, Image, Label, Header} from 'semantic-ui-react';
import MediaParagraphPNG from '../assets/images/media-paragraph.png';
import ParagraphPNG from '../assets/images/paragraph.png';

class HomePage extends Component {

  render() {
    return (
        <div className = "Body">
          <Container>
            <Grid>
              <Grid.Row>
                <Grid.Column width = {10}>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width = {16}>
                        <SearchBar
                          keyword = {this.props.keyword}
                          handleSearchSubmit = {this.props.handleSearchSubmit}
                          onCategoryChange = {this.props.onCategoryChange}
                          category = {this.props.category}
                          />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns = {2}>
                      <Grid.Column className = 'NewsColumn'>
                        <Segment className = "NewsSegment" basic>
                          <Header as = 'h3'>TEST</Header>
                          <Image src = {MediaParagraphPNG}/>
                        </Segment>
                        <Segment className = "NewsSegment" basic>
                          <Image src = {ParagraphPNG}/>
                        </Segment>
                      </Grid.Column>
                      <Grid.Column className = 'NewsColumn'>
                        <Grid.Row>
                          <Segment className = "NewsSegment" basic>
                            <Header as = 'h3'>TEST</Header>
                            <Image size = 'medium' src = {MediaParagraphPNG}/>
                          </Segment>
                      </Grid.Row>
                        <Grid.Row>
                          <Segment className = "NewsSegment" basic>
                            <Image size = 'medium' src = {MediaParagraphPNG}/>
                          </Segment>
                        </Grid.Row>
                        <Grid.Row>
                          <Segment className = "NewsSegment" basic>
                            <Image size = 'medium' src = {MediaParagraphPNG}/>
                          </Segment>
                        </Grid.Row>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
                <Grid.Column width = {6}>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column>
                        <Segment>
                          <Label size = 'large' attached = 'top' color = 'blue'>TEST</Label>
                          <Image src = {ParagraphPNG}/>
                        </Segment>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Segment>
                          <Label size = 'large' attached = 'top' color = 'blue'>TEST</Label>
                          <Image src = {ParagraphPNG}/>
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </div>);
  }
}

export default HomePage;
