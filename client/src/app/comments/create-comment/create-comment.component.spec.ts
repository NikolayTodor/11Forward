import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateCommentComponent } from './create-comment.component';
import { CommonModule } from '@angular/common';
import { CreateCommentDTO } from 'src/app/models/comments/create-comment.dto';

describe('CreateCommentComponent', () => {
    let fixture: ComponentFixture<CreateCommentComponent>;
    let component: CreateCommentComponent;

    beforeEach(async(() => {
      jest.clearAllMocks();

      TestBed.configureTestingModule({
        imports: [SharedModule, CommonModule],
        declarations: [CreateCommentComponent]
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(CreateCommentComponent);
          component = fixture.componentInstance;
        });
    }));

    it('should be defined', () => {
      // Arrange & Act & Assert
      expect(component).toBeDefined();
    });

    describe('createComment()', () => {
        it('should emit the proper constant', () => {
        // Arrange
        const mockComment: CreateCommentDTO = {
          content: 'a'
        };

        // Act
        spyOn(component.toCreateComment, 'emit');
        component.createComment(mockComment);

        // Assert
        expect(component.toCreateComment.emit).toHaveBeenCalled();
        expect(component.toCreateComment.emit).toHaveBeenCalledWith(mockComment);
        });
    });
});
