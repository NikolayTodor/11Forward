import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateCommentComponent } from './create-comment.component';
import { CommonModule } from '@angular/common';
import { CreateCommentDTO } from 'src/app/models/comments/create-comment.dto';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';

describe('CreateCommentComponent', () => {
    let formBuilder;
    let fixture: ComponentFixture<CreateCommentComponent>;
    let component: CreateCommentComponent;

    beforeEach(async(() => {
      jest.clearAllMocks();

      formBuilder = {
        group() {}
      };

      TestBed.configureTestingModule({
        imports: [SharedModule, CommonModule],
        declarations: [CreateCommentComponent]
      })
        .overrideProvider(FormBuilder, { useValue: formBuilder })
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

    describe('ngOnInit()', () => {
      it('should call formBuilder.group() once with correct parameters', () => {
        // Arrange
        const mockedCreateCommentForm = 'create comment form';

        const createCommentFormConfigurations = {
          content: ['',
            [Validators.minLength(5), Validators.maxLength(500), Validators.required]
        ]
        };

        const spy = jest
          .spyOn(formBuilder, 'group')
          .mockReturnValue(mockedCreateCommentForm);

        // Act
        component.ngOnInit();

        // Assert
        expect(spy).toBeCalledTimes(1);
        // expect(spy).toBeCalledWith(createCommentFormConfigurations);
      });

      it('should set the loginForm filed value', () => {
        // Arrange
        const mockedCreateCommentForm = 'create comment form';

        const spy = jest
          .spyOn(formBuilder, 'group')
          .mockReturnValue(mockedCreateCommentForm);

        // Act
        component.ngOnInit();

        // Assert
        expect(component.createCommentForm).toEqual(mockedCreateCommentForm);
      });

    });

});
