package learn.collaboreat.controllers;

import learn.collaboreat.domain.FeedbackService;
import learn.collaboreat.domain.Result;
import learn.collaboreat.models.Feedback;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    private final FeedbackService service;

    public FeedbackController(FeedbackService service) {
        this.service = service;
    }

    @GetMapping
    public List<Feedback> findAll() {
        return service.findAll();
    }

    @GetMapping("/{feedbackId}")
    public ResponseEntity<Object> findById(@PathVariable int feedbackId) {
        Feedback feedback = service.findById(feedbackId);
        if (feedback == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(feedback);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Feedback feedback) {
        Result<Feedback> result = service.add(feedback);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{feedbackId}")
    public ResponseEntity<Object> update(@PathVariable int feedBackId, @RequestBody Feedback feedback) {
        if (feedBackId != feedback.getFeedbackId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<Feedback> result = service.update(feedback);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{feedbackId}")
    public ResponseEntity<Object> deleteById(@PathVariable int feedbackId) {
        if (service.deleteById(feedbackId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
